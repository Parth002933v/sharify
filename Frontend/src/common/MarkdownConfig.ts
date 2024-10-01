import MarkdownIt from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';
import toc from 'markdown-it-toc-done-right';
import markdownItHighlightJs from "markdown-it-highlightjs"


// @ts-ignore
import markdownItImplicitFigures from 'markdown-it-implicit-figures';

// @ts-ignore
import markdownItVideo from 'markdown-it-video';

// @ts-ignore
// import markdownItImsize from 'markdown-it-imsize';

// @ts-ignore
import markdownItTaskLists from 'markdown-it-task-lists';

// @ts-ignore
import markdownItFootnote from 'markdown-it-footnote';

// @ts-ignore
import markdownItSub from "markdown-it-sub"

// @ts-ignore
import markdownItDeflist from "markdown-it-deflist"

// @ts-ignore
import markdownItContainer from "markdown-it-container"



export const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
})
    .use(emoji)
    .use(toc, {
        level: [1, 2, 3], // Include these heading levels in the table of contents
        format: (text: string) => text.replace(/\s+/g, '-') // Format headings
    })
    .use(markdownItHighlightJs)
    .use(markdownItTaskLists)
    // .use(markdownItImsize)
    .use(markdownItFootnote)
    .use(markdownItVideo)
    .use(markdownItDeflist)
    .use(markdownItSub)
    .use(markdownItContainer)
    .use(markdownItImplicitFigures, { figcaption: true })
