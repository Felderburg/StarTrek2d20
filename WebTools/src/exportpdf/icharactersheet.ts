import type { PDFDocument } from '@cantoo/pdf-lib';
import type { Construct } from '../common/construct';
import type { CharacterType } from '../common/characterType';

export enum SheetTag {
  LanguageSupport,
  Landscape,
  Portrait,
  TalentText,
  Lcars,
  UsLetter,
  HalfPage,
  Style2e,
  TwoPage,
  A4,
}

export interface ICharacterSheet {
  getLanguage(): string;
  getName(): string;
  getThumbnailUrl(): string;
  getPdfUrl(type: CharacterType): string;
  populate(pdf: PDFDocument, construct: Construct);
  createFileName(suffix: string, construct: Construct);
  getTags(): SheetTag[];
}
