import MarkdownIt from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import abbr from 'markdown-it-abbr';
import fs from 'fs';
import path from 'path';

// Initialize markdown-it with plugins
export const markdownIt = new MarkdownIt()
    .use(emoji)
    .use(toc, {
        level: [1, 2, 3], // Include these heading levels in the table of contents
        format: (text: string) => text.replace(/\s+/g, '-') // Format headings
    })
    .use(abbr); // Enable abbreviation support
