import t, { getFunctionName } from 'io-ts';
import { isRight } from 'fp-ts/Either';

export type KeywordArguments = Record<string, string>;

export type ParserResult<T> = { value: T } | { errors: string[] };
export type Parser<T> = (input: string) => ParserResult<T>;
export type ArgsParser<T> = (input: string[]) => ParserResult<[T, KeywordArguments]>;

export type KeySchemaEntry<T> = { [K in keyof T]: [K, Parser<T[K]>] }[keyof T];
export type PartialSchemaEntry<T> = { partialParser: Parser<Partial<T>> };
export type KeySchema<T> = (KeySchemaEntry<T> | PartialSchemaEntry<T>)[];

export interface ParserOptions {
  concatenateLastArguments: boolean;
}

const keywordArgumentPattern = /^\[(?<key>.+)\](?<value>.*)$/;
const parseKeywordArguments = (input: string[]) => {
  const keywordArguments: KeywordArguments = {};

  for (let i = 0; i < input.length; i += 1) {
    const matches = keywordArgumentPattern.exec(input[input.length - i - 1]);

    if (matches && matches.groups?.key && matches.groups?.value) {
      keywordArguments[matches.groups.key] = matches.groups.value.trim();
    } else {
      break;
    }
  }

  return keywordArguments;
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
  options: Partial<ParserOptions>,
) => {
  if (options.concatenateLastArguments && index === schema.length - 1) {
    return input.slice(index).join('|');
  }
  return input[index];
};

export const createSchemaParser = <T>(
  typeSchema: t.Type<T>,
  schema: KeySchema<T>,
  options: Partial<ParserOptions> = {},
): ArgsParser<T> => (
    inputs: string[],
  ) => {
    let partialResult: Partial<T> = {};
    const errors: string[] = [];

    const keywordArguments = parseKeywordArguments(inputs);

    for (let i = 0; i < schema.length; i += 1) {
      const input = getInput(i, inputs, schema, options);
      const subSchema = schema[i];

      if ('partialParser' in subSchema) {
        const { partialParser } = subSchema;

        const parserResult = partialParser(input);

        if ('value' in parserResult) {
          partialResult = {
            ...partialResult,
            ...parserResult.value,
          };
        } else if ('errors' in parserResult) {
          errors.push(...parserResult.errors);
        }
      } else {
        const [key, parser] = subSchema;

        const parserResult = parser(input);

        if ('value' in parserResult) {
          partialResult[key] = parserResult.value;
        } else if ('errors' in parserResult) {
          errors.push(...parserResult.errors);
        }
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

export const parseString: Parser<string> = (input: string) => ({ value: input });

export const parseNumber: Parser<number> = (input: string) => {
  const parsedValue = +input;

  if (Number.isNaN(parsedValue)) {
    return { errors: [`${input} is not a number.`] };
  }

  return { value: parsedValue };
};

export const createOptionalParser = <T>(parser: Parser<T>) => (input?: string) => {
  if (input === undefined) {
    return { value: undefined };
  }

  return parser(input);
};

export const createArrayParser = <T>(parser: Parser<T>): Parser<T[]> => (input: string) => {
  const values: T[] = [];
  const errors: string[] = [];

  input.split(',').forEach((splitInput) => {
    const splitInputResult = parser(splitInput.trim());

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

export const coalesceErrors = (
  parserResults: ParserResult<any>[],
) => parserResults.reduce((errors: string[], parserResult) => {
  if ('errors' in parserResult) {
    return [...errors, ...parserResult.errors];
  }

  return errors;
}, []);
