import { describe, expect, it } from '@jest/globals';
import { BadgeMessage, deserializeBadgeMessage, serializeBadgeMessage } from './badge';
import { assertResultValue, samplePlayer } from '../test-utilities';

describe('BadgeMessage', () => {
  const sampleType = 'gold';
  const sampleFormat = 'gen5ou';
  const sampleDetails = { threshold: 3, season: 1 };
  const sampleDetailsText = `${sampleDetails.threshold}-${sampleDetails.season}`;

  describe('deserialization', () => {
    it('deserializes a badge message', () => {
      const args = [
        samplePlayer.text,
        sampleType,
        sampleFormat,
        sampleDetailsText,
      ];

      const deserializationResult = deserializeBadgeMessage(args);
      expect('value' in deserializationResult).toBe(true);

      assertResultValue(deserializationResult);

      const {
        player,
        type,
        format,
        details,
      } = deserializationResult.value[0];
      expect(player).toStrictEqual(samplePlayer.value);
      expect(type).toBe(sampleType);
      expect(format).toBe(sampleFormat);
      expect(details).toStrictEqual(sampleDetails);
    });

    it('returns errors given invalid input', () => {
      const deserializationResult = deserializeBadgeMessage([]);
      expect('errors' in deserializationResult).toBe(true);
    });
  });

  describe('serialization', () => {
    it('serializes a badge message', () => {
      const badgeMessage: BadgeMessage = {
        player: samplePlayer.value,
        type: sampleType,
        format: sampleFormat,
        details: sampleDetails,
      };

      const serializationResult = serializeBadgeMessage(badgeMessage, {});
      expect('value' in serializationResult).toBe(true);

      assertResultValue(serializationResult);

      const [
        playerText,
        typeText,
        formatText,
        detailsText,
      ] = serializationResult.value;
      expect(playerText).toStrictEqual(samplePlayer.text);
      expect(typeText).toBe(sampleType);
      expect(formatText).toBe(formatText);
      expect(detailsText).toBe(sampleDetailsText);
    });

    it('returns errors given invalid input', () => {
      const serializationResult = serializeBadgeMessage({} as BadgeMessage, {});
      expect('errors' in serializationResult).toBe(true);
    });
  });
});
