import * as t from 'io-ts';
import {
  ArgsDeserializer, ArgsSerializer,
} from '../parser';

export const ruleMessageType = t.intersection([
  t.type({
    ruleName: t.string,
  }),
  t.partial({
    ruleDescription: t.string,
  }),
]);

/**
 * A message that is sent when a battle's rule is announced.
 *
 * Serialized example: `|rule|HP Percentage Mod: HP is shown in percentages`
 *
 * Deserialized example:
 * ```json
 * {
 *   "ruleName": "HP Percentage Mod",
 *   "ruleDescription": "HP is shown in percentages"
 * }
 * ```
 *
 * @member ruleName The name of the rule
 * @member ruleDescription The description of the rule
 */
export type RuleMessage = t.TypeOf<typeof ruleMessageType>;

export const deserializeRuleMessage: ArgsDeserializer<RuleMessage> = (input: string[]) => {
  const [ruleName, ruleDescription] = input[0].split(':').map((splitInput) => splitInput.trim());

  if (!ruleDescription) {
    return {
      value: [{ ruleName }, {}],
    };
  }

  return {
    value: [{ ruleName, ruleDescription }, {}],
  };
};
export const serializeRuleMessage: ArgsSerializer<RuleMessage> = (input) => ({
  value: [`${input.ruleName}${input.ruleDescription ? `: ${input.ruleDescription}` : ''}`],
});
