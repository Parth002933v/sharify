
export function getHtmlFromLexicalJSON(json: string): string {
    const parsed = JSON.parse(json);
    const root = parsed.root;
    return getHtmlFromLexicalNode(root);
}

function getHtmlFromLexicalNode(node: {
    type: string;
    children?: Array<{ type: string; text?: string; tag?: string }>;
}): string {
    let result = '';
    const { children } = node;
    if (children !== undefined) {
        if (children.length === 0) {
            return result;
        }
        children.forEach((child) => {
            const { type } = child;
            if (type === 'paragraph') {
                result += `<p>${getHtmlFromLexicalNode(child)} </p>`;
            } else if (type === 'heading') {
                const tag = child.tag ?? 'h1';
                result += `<${tag} > ${getHtmlFromLexicalNode(child)} </${tag}>`;
            } else if (type === 'text') {
                result += `<span>${child.text} </span>`;
            } else {
                result += '<span style="font-weight: bold">Unknown Node</span>';
            }
        });
    }
    return result;
}


//*================================================================
