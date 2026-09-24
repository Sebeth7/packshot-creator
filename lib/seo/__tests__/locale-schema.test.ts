import { describe, it, expect } from 'vitest';
import { schemaInLanguage } from '../locale-schema';

describe('schemaInLanguage', () => {
  it('fr → fr-FR (inchangé)', () => expect(schemaInLanguage('fr')).toBe('fr-FR'));
  it('en → en-US (inchangé)', () => expect(schemaInLanguage('en')).toBe('en-US'));
  it('de-ch → de-CH (corrigé)', () => expect(schemaInLanguage('de-ch')).toBe('de-CH'));
});
