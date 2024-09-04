// export const isMarkdown = (text: string) => {
//     const markdownRegex = /(\*{1,2}[^\*]+\*{1,2})|(\[[^\]]+\]\([^\)]+\))|(`[^`]+`)|(^#{1,6} )|(!\[.*\]\(.*\))/;
//     return markdownRegex.test(text);
// };


// const marked = require('');
// import { marked, parse, Rules } from "marked"
export const isMarkdown = (text: string) => {
    const markdownRegex = /[#*>\-`]|!\[|\[(.*?)\]\((.*?)\)/;
    return markdownRegex.test(text);
}
