import { existsSync } from 'fs';

export function checkSitemap(): string[] {
    const found =
        existsSync('sitemap.xml') ||
        existsSync('public/sitemap.xml') ||
        existsSync('dist/sitemap.xml');
    return found ? [] : ['sitemap.xml not found'];
}
