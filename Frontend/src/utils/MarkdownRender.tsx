import { markdownIt } from "@/common/MarkdownConfig";
import React from "react";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const htmlContent = markdownIt.render(content);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
