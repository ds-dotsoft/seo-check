import { CheerioAPI } from 'cheerio';

export function checkMeta($: CheerioAPI, file: string): string[] {
    const errs: string[] = [];
    if ($('title').length === 0) {
        errs.push(`${file}: <title> tag missing`);
    }
    if ($('meta[name="description"]').length === 0) {
        errs.push(`${file}: <meta name="description"> missing`);
    }
    return errs;
}
