import * as core from '@actions/core';
import fg from 'fast-glob';
import { readFileSync } from 'fs';
import { load } from 'cheerio';

import { checkMeta } from './rules/meta';
import { checkAlt } from './rules/alt';
import { checkSitemap } from './rules/sitemap';

async function run(): Promise<void> {
    try {
        const failOnWarn = core.getInput('fail_on_warning') === 'true';
        const pattern = ['**/*.html', '**/*.md', '!node_modules/**'];
        const files = await fg(pattern);

        let errors: string[] = [];
        let warnings: string[] = [];

        for (const file of files) {
            const content = readFileSync(file, 'utf-8');
            const $ = load(content);

            errors.push(...checkMeta($, file));
            warnings.push(...checkAlt($, file));
        }

        errors.push(...checkSitemap());

        if (errors.length > 0) {
            core.setFailed(`❌ SEO check failed:\n${errors.join('\n')}`);
            return;
        }

        if (warnings.length > 0) {
            if (failOnWarn) {
                core.setFailed(`⚠️  Warnings as errors:\n${warnings.join('\n')}`);
                return;
            } else {
                warnings.forEach(w => core.warning(w));
            }
        }

        core.notice('✅ Dotsoft SEO check passed');
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

run();
