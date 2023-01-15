import * as t from 'io-ts';
import {
  createJsonDeserializer,
  createNullableDeserializer,
  createNullableSerializer,
  createSchemaDeserializer,
  createSchemaSerializer,
  KeySchema,
  serializeJson,
} from '../parser';

const sidePokemonType = t.intersection([
  t.type({
    ident: t.string,
    details: t.string, // TODO: Is this a details? Can it be parsed? (Update: it is)
    condition: t.string, // TODO: Is this a condition? Can it be parsed (Update: it is)
    active: t.boolean,
    stats: t.type({
      atk: t.number,
      def: t.number,
      spa: t.number,
      spd: t.number,
      spe: t.number,
    }),
    moves: t.array(t.string),
    baseAbility: t.string,
    item: t.string,
    pokeball: t.string,
  }),
  t.partial({
    ability: t.string,
    commanding: t.boolean,
    reviving: t.boolean,
    teraType: t.string,
    terastallized: t.string,
  }),
]);

const sideType = t.type({
  name: t.string,
  id: t.string,
  pokemon: t.array(sidePokemonType),
});

const switchRequestType = t.type({
  forceSwitch: t.array(t.boolean),
});

const teamPreviewRequestType = t.intersection([
  t.type({
    teamPreview: t.boolean,
  }),
  t.partial({
    maxChosenTeamSize: t.number,
  }),
]);

const moveType = t.intersection([
  t.type({
    move: t.string,
    id: t.string,
  }),
  t.partial({
    target: t.string,
    disabled: t.union([t.string, t.boolean]),
    disabledSource: t.string,
    pp: t.number,
    maxpp: t.number,
  }),
]);

const maxMoveType = t.intersection([
  t.type({
    move: t.string,
    target: t.string,
  }),
  t.partial({
    disabled: t.boolean,
    disabledSource: t.string,
  }),
]);

const maxMovesType = t.intersection([
  t.type({
    maxMoves: t.array(maxMoveType),
  }),
  t.partial({
    gigantamax: t.boolean,
  }),
]);

const activeType = t.intersection([
  t.type({
    moves: t.array(moveType),
  }),
  t.partial({
    maybeDisabled: t.boolean,
    trapped: t.boolean,
    maybeTrapped: t.boolean,
    canMegaEvo: t.boolean,
    canUltraBurst: t.boolean,
    canZMove: t.union([
      t.array(
        t.union([
          t.type({
            move: t.string,
            target: t.string,
          }),
          t.null,
        ]),
      ),
      t.null,
    ]),
    canDynamax: t.boolean,
    maxMoves: maxMovesType,
    canTerastallize: t.string,
  }),
]);

const moveRequestType = t.intersection([
  t.type({
    active: activeType,
  }),
  t.partial({
    ally: sideType,
  }),
]);

const waitRequestType = t.type({
  wait: t.literal(true),
});

const requestType = t.intersection([
  t.union([switchRequestType, teamPreviewRequestType, moveRequestType, waitRequestType]),
  t.type({
    side: sideType,
  }),
  t.partial({
    noCancel: t.boolean,
    rqid: t.number,
  }),
]);

export const requestMessageType = t.type({
  request: t.union([requestType, t.null]),
});

/* eslint-disable max-len */
/**
 * A message that is sent when a player receives a request in-battle.
 *
 * Serialized example: `|request|{"active":[{"moves":[{"move":"Horn Leech","id":"hornleech","pp":14,"maxpp":16,"target":"normal","disabled":false},{"move":"Double-Edge","id":"doubleedge","pp":23,"maxpp":24,"target":"normal","disabled":false},{"move":"Swords Dance","id":"swordsdance","pp":31,"maxpp":32,"target":"self","disabled":false},{"move":"Stomping Tantrum","id":"stompingtantrum","pp":16,"maxpp":16,"target":"normal","disabled":false}]}],"side":{"name":"Mr. Boblak","id":"p2","pokemon":[{"ident":"p2: Sawsbuck","details":"Sawsbuck-Autumn, L88, M","condition":"93/284","active":true,"stats":{"atk":226,"def":173,"spa":156,"spd":173,"spe":217},"moves":["hornleech","doubleedge","swordsdance","stompingtantrum"],"baseAbility":"sapsipper","item":"lifeorb","pokeball":"pokeball","ability":"sapsipper","commanding":false,"reviving":false,"teraType":"Normal","terastallized":"Normal"}]},"rqid":13}`
 *
 * Deserialized example:
 * ```json
 * {
 *   "active": [{
 *     "moves": [{
 *       "move": "Horn Leech",
 *       "id": "hornleech",
 *       "pp": 14,
 *       "maxpp": 16,
 *       "target": "normal",
 *       "disabled": false
 *     }]
 *   }],
 *   "side": {
 *     "name": "zarel",
 *     "id": "p2",
 *     "pokemon": [{
 *       "ident": "p2: Sawsbuck",
 *       "details": "Sawsbuck-Autumn, L88, M",
 *       "condition": "93/284",
 *       "active": true,
 *       "stats":{
 *         "atk": 226,
 *         "def": 173,
 *         "spa": 156,
 *         "spd": 173,
 *         "spe": 217
 *       },
 *       "moves": [
 *         "hornleech",
 *         "doubleedge",
 *         "swordsdance",
 *         "stompingtantrum"
 *       ],
 *       "baseAbility": "sapsipper",
 *       "item": "lifeorb",
 *       "pokeball": "pokeball",
 *       "ability": "sapsipper",
 *       "commanding": false,
 *       "reviving": false,
 *       "teraType": "Normal",
 *       "terastallized": "Normal"
 *     }]
 *   },
 *   "rqid": 13
 * }
 * ```
 *
 * @member request The request
 */
export type RequestMessage = t.TypeOf<typeof requestMessageType>;
/* eslint-enable max-len */

export const requestMessageSchema: KeySchema<RequestMessage> = [
  ['request', createNullableDeserializer(createJsonDeserializer(requestType)), createNullableSerializer(serializeJson)],
];

export const deserializeRequestMessage = createSchemaDeserializer(
  requestMessageType,
  requestMessageSchema,
  { concatenateLastArguments: true, skipKeywordArguments: true },
);
export const serializeRequestMessage = createSchemaSerializer(
  requestMessageType,
  requestMessageSchema,
);
