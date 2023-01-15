import * as t from 'io-ts';
import { ArgsDeserializer, ArgsSerializer } from '../parser';

// TODO: Document this file
const formatType = t.type({
  name: t.string,
  section: t.string,
  column: t.number,
  hasTeamGenerator: t.boolean,
  searchShow: t.boolean,
  challengeShow: t.boolean,
  tournamentShow: t.boolean,
  isLevel50Format: t.boolean,
});

type Format = t.TypeOf<typeof formatType>;

const formatsMessageType = t.type({
  isLocalLadder: t.boolean,
  formats: t.array(formatType),
});

export type FormatsMessage = t.TypeOf<typeof formatsMessageType>;

export const deserializeFormatsMessage: ArgsDeserializer<FormatsMessage> = (input: string[]) => {
  let isLocalLadder = false;
  let isSection = false;
  const formats: Format[] = [];
  let column = 0;
  let section = '';

  input.forEach((part) => {
    if (isSection) {
      section = part;
      isSection = false;
    } else if (part === ',LL') {
      isLocalLadder = true;
    } else if (part.charAt(0) === ',' && !Number.isNaN(parseInt(part.slice(1), 10))) {
      isSection = true;

      if (part.length) {
        column = parseInt(part.slice(1), 10);
      }
    } else {
      const lastCommaIndex = part.lastIndexOf(',');

      if (lastCommaIndex < 0) return; // TODO: Throw error

      const name = part.substring(0, lastCommaIndex);
      const code = parseInt(part.substring(lastCommaIndex + 1), 16);

      formats.push({
        name,
        column,
        section,
        hasTeamGenerator: (code & 1) > 0, // eslint-disable-line no-bitwise
        searchShow: (code & 2) > 0, // eslint-disable-line no-bitwise
        challengeShow: (code & 4) > 0, // eslint-disable-line no-bitwise
        tournamentShow: (code & 8) > 0, // eslint-disable-line no-bitwise
        isLevel50Format: (code & 16) > 0, // eslint-disable-line no-bitwise
      });
    }
  });

  return {
    value: [{
      isLocalLadder,
      formats,
    }, {}],
  };
};

export const serializeFormatsMessage: ArgsSerializer<FormatsMessage> = (input) => {
  const parts: string[] = [];

  if (input.isLocalLadder) {
    parts.push(',LL');
  }

  let currentColumn = -1;
  let currentSection = '';

  input.formats.forEach((format) => {
    if ((format.column !== currentColumn) || (format.section !== currentSection)) {
      currentColumn = format.column;
      currentSection = format.section;
      parts.push(`,${currentColumn}`);
      parts.push(currentSection);
    }

    let code = 0;
    if (format.hasTeamGenerator) code |= 1; // eslint-disable-line no-bitwise
    if (format.searchShow) code |= 2; // eslint-disable-line no-bitwise
    if (format.challengeShow) code |= 4; // eslint-disable-line no-bitwise
    if (format.tournamentShow) code |= 8; // eslint-disable-line no-bitwise
    if (format.isLevel50Format) code |= 16; // eslint-disable-line no-bitwise
    parts.push(`${format.name},${code.toString(16)}`);
  });

  return { value: parts };
};
