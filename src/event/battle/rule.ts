import * as t from 'io-ts';
import {
  ArgsParser,
} from '../parser';

// `|rule|RULE: DESCRIPTION`
// > Will appear multiple times, one for each
//     |rule|Species Clause: Limit one of each Pokémon
export const ruleEventType = t.type({
  ruleName: t.string,
  ruleDescription: t.string,
});
export type RuleEvent = t.TypeOf<typeof ruleEventType>;
export const parseRuleEvent: ArgsParser<RuleEvent> = (input: string[]) => {
  const [ruleName, ruleDescription] = input[0].split(':').map((splitInput) => splitInput.trim());

  if (!ruleDescription) {
    return { errors: ['No description for rule'] };
  }

  return {
    value: [{ ruleName, ruleDescription }, {}],
  };
};
