import { CheerioAPI } from 'cheerio';

export function checkAlt($: CheerioAPI, file: string): string[] {
    const warns: string[] = [];
    $('img').each((_, img) => {
        if (!$(img).attr('alt')) {
            warns.push(`${file}: <img> missing alt text`);
        }
    });
    return warns;
}
