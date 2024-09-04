import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const renderMarkdown = async () => {
      let rawHtmlContent: string | Promise<string> = marked(content);

      // Check if it's a Promise or a string
      if (rawHtmlContent instanceof Promise) {
        rawHtmlContent = await rawHtmlContent;
      }

      // Sanitize the HTML content
      const sanitizedHtmlContent = DOMPurify.sanitize(rawHtmlContent) as string;
      setHtmlContent(sanitizedHtmlContent);
    };

    renderMarkdown();
  }, [content]);

  // Render the sanitized HTML content inside a div
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
