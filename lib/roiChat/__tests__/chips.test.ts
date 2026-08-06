import { describe, it, expect } from 'vitest';
import { parseAssistantText } from '../chips';

describe('parseAssistantText (chips)', () => {
  it('extrait les options et retire le marqueur du texte', () => {
    const { text, chips } = parseAssistantText(
      'Quel est votre volume annuel ?\n[[choix: ~500 | ~2 000 | ~10 000]]'
    );
    expect(text).toBe('Quel est votre volume annuel ?');
    expect(chips).toEqual(['~500', '~2 000', '~10 000']);
  });

  it('texte sans marqueur : aucune chip', () => {
    const { text, chips } = parseAssistantText('Décrivez votre production.');
    expect(text).toBe('Décrivez votre production.');
    expect(chips).toEqual([]);
  });

  it('masque un marqueur incomplet en fin de flux (streaming)', () => {
    expect(parseAssistantText('Achat ou leasing ?\n[[choix: ach').text).toBe('Achat ou leasing ?');
    expect(parseAssistantText('Achat ou leasing ?\n[[cho').text).toBe('Achat ou leasing ?');
    expect(parseAssistantText('Achat ou leasing ?\n[[').text).toBe('Achat ou leasing ?');
  });

  it('limite à 4 options et ignore les vides', () => {
    const { chips } = parseAssistantText('[[choix: a | | b | c | d | e]]');
    expect(chips).toEqual(['a', 'b', 'c', 'd']);
  });

  it('garde le dernier marqueur si plusieurs', () => {
    const { chips } = parseAssistantText('X [[choix: un | deux]] Y [[choix: trois | quatre]]');
    expect(chips).toEqual(['trois', 'quatre']);
  });

  it('ne casse pas les doubles crochets ordinaires', () => {
    const { text } = parseAssistantText('Voir [[méthodologie]] pour le détail.');
    expect(text).toBe('Voir [[méthodologie]] pour le détail.');
  });
});
