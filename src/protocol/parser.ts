import t, { getFunctionName } from 'io-ts';
import { isRight } from 'fp-ts/Either';
import { isLeft } from 'fp-ts/lib/These';

export type KeywordArguments = Record<string, string>;

export type ResultValue<T> = { value: T };
export type ResultError = { errors: string[] };
export type Result<T> = ResultValue<T> | ResultError;
export type Deserializer<T> = (input: string) => Result<T>;
export type Serializer<T> = (input: T) => Result<string | undefined>;
export type ArgsDeserializer<T> = (input: string[]) => Result<[T, KeywordArguments]>;
export type ArgsSerializer<T> = (input: T, keywordArguments: KeywordArguments) => Result<string[]>;

export type KeyResult<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
export type KeySchemaEntry<T> = {
  [K in keyof T]: [K, Deserializer<T[K]>, Serializer<T[K]>]
}[keyof T];
export type KeySchema<T> = KeySchemaEntry<T>[];

export interface DeserializerOptions {
  concatenateLastArguments: boolean;
  skipKeywordArguments: boolean;
}

export interface SerializerOptions {
  omitTrailingUndefinedParts: boolean;
}

const keywordArgumentPattern = /^\[(?<key>.+)\](?<value>.*)$/;
const extractKeywordArguments = (inputs: string[]): [KeywordArguments, string[]] => {
  const inputsCopy = [...inputs];
  const keywordArguments: KeywordArguments = {};

  for (let i = 0; i < inputs.length; i += 1) {
    const matches = keywordArgumentPattern.exec(inputs[inputs.length - i - 1]);

    if (matches && matches.groups?.key && matches.groups?.value !== undefined) {
      keywordArguments[matches.groups.key] = matches.groups.value.trim();
      inputsCopy.pop();
    } else {
      break;
    }
  }

  return [keywordArguments, inputsCopy];
};

const stringify = (v: any) => {
  if (typeof v === 'function') {
    return getFunctionName(v);
  }

  if (typeof v === 'number' && !Number.isFinite(v)) {
    if (Number.isNaN(v)) {
      return 'NaN';
    }

    return v > 0 ? 'Infinity' : '-Infinity';
  }

  return JSON.stringify(v);
};

const getContextPath = (context: t.Context) => {
  const path = context.map(({ key }) => key).join('.');

  return `${path}: ${context[context.length - 1].type.name}`;
};

const getMessage = (error: t.ValidationError) => (error.message !== undefined
  ? error.message
  : `Invalid value: ${stringify(error.value)} supplied to ${getContextPath(error.context)}`);

const getInput = <T>(
  index: number,
  input: string[],
  schema: KeySchema<T>,
  options: Partial<DeserializerOptions>,
) => {
  const inputExists = (input[index] !== undefined) && index === schema.length - 1;
  if (options.concatenateLastArguments && inputExists) {
    return input.slice(index).join('|');
  }
  return input[index];
};

export const createSchemaDeserializer = <T>(
  typeSchema: t.Type<T>,
  schema: KeySchema<T>,
  options: Partial<DeserializerOptions> = {},
): ArgsDeserializer<T> => (
    inputs: string[],
  ) => {
    const partialResult: Partial<T> = {};
    const errors: string[] = [];

    const [keywordArguments, remainingInputs] = options.skipKeywordArguments
      ? [{}, inputs]
      : extractKeywordArguments(inputs);

    for (let i = 0; i < schema.length; i += 1) {
      const input = getInput(i, remainingInputs, schema, options);
      const subSchema = schema[i];

      try {
        const [key, deserializer] = subSchema;

        const deserializationResult = deserializer(input);

        if ('value' in deserializationResult) {
          partialResult[key] = deserializationResult.value;
        } else if ('errors' in deserializationResult) {
          errors.push(...deserializationResult.errors);
        }
      } catch (error) {
        errors.push(`Unknown error parsing ${input} [index: ${i}]`);
      }
    }

    if (errors.length > 0) {
      return { errors };
    }

    const output = typeSchema.decode(partialResult);

    if (isRight(output)) {
      return { value: [output.right, keywordArguments] };
    }
    return { errors: output.left.map(getMessage) };
  };

export const createSchemaSerializer = <T>(
  typeSchema: t.Type<T>,
  schema: KeySchema<T>,
  options: Partial<SerializerOptions> = {},
): ArgsSerializer<T> => (
    input: T,
    keywordArguments: KeywordArguments,
  ) => {
    const parts: (string | undefined)[] = [];
    const errors: string[] = [];

    const inputResult = typeSchema.decode(input);

    if (isLeft(inputResult)) {
      return { errors: inputResult.left.map(getMessage) };
    }

    for (let i = 0; i < schema.length; i += 1) {
      const subSchema = schema[i];
      const [key,, serializer] = subSchema;
      const serializationResult = serializer(input[key]);

      if ('value' in serializationResult) {
        parts.push(serializationResult.value);
      } else {
        errors.push(...serializationResult.errors);
      }
    }

    if (errors.length) {
      return { errors };
    }

    if (options.omitTrailingUndefinedParts) {
      while (parts.length && parts[parts.length - 1] === undefined) {
        parts.pop();
      }
    }

    Object.entries(keywordArguments).forEach(([key, value]) => {
      if (value.length) {
        parts.push(`[${key}] ${value}`);
      } else {
        parts.push(`[${key}]`);
      }
    });

    return {
      value: parts.map((part) => part || ''),
    };
  };

export const deserializeString: Deserializer<string> = (input: string) => ({ value: input });

export const serializeString: Serializer<string> = (input) => ({ value: input });

export const deserializeNumber: Deserializer<number> = (input: string) => {
  const deserializedValue = +input;

  if (Number.isNaN(deserializedValue)) {
    return { errors: [`${input} is not a number.`] };
  }

  return { value: deserializedValue };
};

export const serializeNumber: Serializer<number> = (input) => ({ value: input.toString() });

export const createOptionalDeserializer = <T>(
  deserializer: Deserializer<T>,
  treatEmptyAsUndefined = true,
) => (input?: string) => {
    if (input === undefined || (treatEmptyAsUndefined && !input.length)) {
      return { value: undefined };
    }

    return deserializer(input);
  };

export const createOptionalSerializer = <T>(
  serializer: Serializer<T>,
) => (input: T | undefined) => {
    if (input === undefined) {
      return { value: undefined };
    }

    return serializer(input);
  };

export const createArrayDeserializer = <T>(deserializer: Deserializer<T>, delimiter = ','): Deserializer<T[]> => (input: string) => {
  const values: T[] = [];
  const errors: string[] = [];

  input.split(delimiter).forEach((splitInput) => {
    const splitInputResult = deserializer(splitInput);

    if ('errors' in splitInputResult) {
      errors.push(...splitInputResult.errors);
    } else if ('value' in splitInputResult) {
      values.push(splitInputResult.value);
    }
  });

  if (errors.length > 0) {
    return { errors };
  }

  return { value: values };
};

export const createArraySerializer = <T>(serializer: Serializer<T>, delimiter = ','): Serializer<T[]> => (input) => {
  const errors: string[] = [];

  const serializedValues = input.map((value) => {
    const result = serializer(value);

    if ('errors' in result) {
      errors.push(...result.errors);
      return '';
    }
    return result.value || '';
  });

  if (errors.length > 0) {
    return { errors };
  }

  return { value: serializedValues.join(delimiter) };
};

export const createJsonDeserializer = <T>(type: t.Type<T>): Deserializer<T> => (input: string) => {
  try {
    const json = JSON.parse(input);
    const output = type.decode(json);

    if (isRight(output)) {
      return { value: output.right };
    }

    return { errors: output.left.map(getMessage) };
  } catch (error) {
    return { errors: [`${input} is not valid JSON`] };
  }
};

export const serializeJson: Serializer<any> = <T>(input: T) => ({ value: JSON.stringify(input) });

export const createNullableDeserializer = <T>(
  deserializer: Deserializer<T>,
): Deserializer<T | null> => (input: string) => {
    if (input === 'null') {
      return { value: null };
    }

    return deserializer(input);
  };

export const createNullableSerializer = <T>(
  serializer: Serializer<T>,
): Serializer<T | null> => (input) => {
    if (input === null) {
      return { value: 'null' };
    }

    return serializer(input);
  };

export const coalesceErrors = (
  deserializationResults: Result<any>[],
) => deserializationResults.reduce((errors: string[], deserializationResult) => {
  if ('errors' in deserializationResult) {
    return [...errors, ...deserializationResult.errors];
  }

  return errors;
}, []);

export const createSubcommandDeserializer = <T>(
  subcommandDeserializers: { [K in keyof T]: ArgsDeserializer<T[K]> },
) => (input: string): Result<KeyResult<T> | ['unhandled', string]> => {
    const [subcommand, ...rest] = input.split('|');
    const subcommandKey = subcommand as keyof T;
    const subcommandDeserializer = subcommandDeserializers[subcommandKey];

    if (subcommandDeserializer) {
      const result = subcommandDeserializer(rest);

      if ('value' in result) {
        return { value: [subcommandKey, result.value[0]] };
      }

      return result;
    }

    return { value: ['unhandled', input] };
  };

export const createSubcommandSerializer = <T>(
  subcommandSerializers: { [K in keyof T]: ArgsSerializer<T[K]> },
) => (input: KeyResult<T> | ['unhandled', string]): Result<string> => {
    const [subcommand, subcommandInput] = input;

    if (subcommand === 'unhandled') {
      return { value: subcommandInput as string };
    }

    const subcommandSerializer = subcommandSerializers[subcommand];

    if (subcommandSerializer) {
      const result = subcommandSerializer(subcommandInput as T[keyof T], {}); // TODO: Key word args

      if ('value' in result) {
        return { value: [subcommand, ...result.value].join('|') };
      }

      return result;
    }

    return { errors: [`No matching subcommand serializer for ${String(subcommand)}`] };
  };
