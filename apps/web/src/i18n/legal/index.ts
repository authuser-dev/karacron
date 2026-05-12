import type { Locale } from '@i18n/config';
import * as de from './de';
import * as en from './en';
import * as es from './es';
import * as fr from './fr';
import * as hi from './hi';
import * as it from './it';
import * as ja from './ja';
import * as pt from './pt';
import * as ru from './ru';
import * as zh from './zh';

export interface LegalContent {
	terms: string;
	privacy: string;
}

const legalByLocale: Partial<Record<Locale, LegalContent>> = {
	de,
	en,
	es,
	fr,
	hi,
	it,
	ja,
	pt,
	ru,
	zh,
};

export function getLegalContent(locale: Locale): LegalContent {
	return legalByLocale[locale] ?? en;
}
