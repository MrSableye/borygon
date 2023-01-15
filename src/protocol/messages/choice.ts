import * as t from 'io-ts';
import {
  createArrayDeserializer,
  createArraySerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  Deserializer,
  KeySchema,
  Serializer,
} from '../parser';

// TODO: Document this file
const moveEventType = t.keyof({
  mega: true,
  zmove: true,
  ultra: true,
  dynamax: true,
  terastallize: true,
});

type MoveEvent = t.TypeOf<typeof moveEventType>;

const eventDataToType: Record<string, MoveEvent> = {
  mega: 'mega',
  zmove: 'zmove',
  ultra: 'ultra',
  dynamax: 'dynamax',
  gigantamax: 'dynamax',
  max: 'dynamax',
  terastal: 'terastallize',
  terastallize: 'terastallize',
};

const noParamChoiceTypes = t.keyof({
  shift: true,
  pass: true,
  skip: true,
  auto: true,
  default: true,
  '': true,
});

type NoParamChoiceType = t.TypeOf<typeof noParamChoiceTypes>;

const slotChoiceTypes = t.keyof({
  switch: true,
  team: true,
});

type SlotChoiceType = t.TypeOf<typeof slotChoiceTypes>;

const moveChoiceType = t.intersection([
  t.type({
    type: t.literal('move'),
    move: t.union([t.string, t.number]),
  }),
  t.partial({
    event: moveEventType,
  }),
]);

type MoveChoice = t.TypeOf<typeof moveChoiceType>;

const choiceType = t.union([
  t.type({
    type: noParamChoiceTypes,
  }),
  t.type({
    type: slotChoiceTypes,
    slot: t.number,
  }),
  moveChoiceType,
]);

type Choice = t.TypeOf<typeof choiceType>;

const deserializeChoice: Deserializer<Choice> = (input) => {
  const [type, ...rest] = input.split(' ');
  if (type in noParamChoiceTypes.keys) {
    return { value: { type: type as NoParamChoiceType } };
  } if (type in slotChoiceTypes.keys) {
    const [slotString] = rest;
    const slot = parseInt(slotString, 10); // TODO: Throw error if NaN

    return { value: { type: type as SlotChoiceType, slot } };
  }
  const [move, ...moveRest] = rest;

  let moveEvent: MoveEvent | undefined;
  for (let i = moveRest.length - 1; i >= 0; i -= 1) {
    const mappedEventType = eventDataToType[moveRest[i]];
    if (mappedEventType) {
      moveEvent = mappedEventType;
    }
    // TODO: Throw error if multiple event types are provided
  }

  const moveChoice: MoveChoice = {
    type: 'move',
    move,
  };

  const parsedMove = parseInt(move, 10);
  if (!Number.isNaN(parsedMove)) {
    moveChoice.move = parsedMove;
  }

  if (moveEvent) {
    moveChoice.event = moveEvent;
  }

  return { value: moveChoice };
};

const serializeChoice: Serializer<Choice> = (input) => {
  let result = input.type;

  if ('slot' in input) {
    result += ` ${input.slot}`;
  } else if ('move' in input) {
    result += ` ${input.move}`;
    if (input.event) {
      result += ` ${input.event}`;
    }
  }

  return { value: result };
};

const choiceMessageType = t.type({
  sideChoices: t.array(t.array(choiceType)),
});

export type ChoiceMessage = t.TypeOf<typeof choiceMessageType>;

export const ChoiceMessageSchema: KeySchema<ChoiceMessage> = [
  [
    'sideChoices',
    createArrayDeserializer(createArrayDeserializer(deserializeChoice, ','), '|'),
    createArraySerializer(createArraySerializer(serializeChoice, ','), '|'),
  ],
];

export const deserializeChoiceMessage = createSchemaDeserializer(
  choiceMessageType,
  ChoiceMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeChoiceMessage = createSchemaSerializer(
  choiceMessageType,
  ChoiceMessageSchema,
);
