import React from "react";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const mdParser = new MarkdownIt();

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Convert the Markdown to HTML
  const rawHtmlContent = mdParser.render(content);

  // Sanitize the HTML content
  const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent);

  console.log(sanitizedHtmlContent);

  // Render the sanitized HTML content inside a div
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
    />
  );
};

export default MarkdownRenderer;
