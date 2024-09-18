import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-800 transition-colors hover:text-teal-500 focus:outline-none"
      >
        {question}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

interface FAQData {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqData: FAQData[] = [
    {
      question: "What is Sharify?",
      answer:
        "Sharify is an easy-to-use file-sharing platform where users can upload, share, and download files with a custom URL. It also supports secure access through password protection.",
    },
    {
      question: "How can I upload files?",
      answer:
        "Simply drag and drop your files into the provided area or click to browse your files. After uploading, a link will be generated that you can share with others.",
    },
    {
      question: "What types of files are supported?",
      answer:
        "Sharify supports a wide range of file formats including images, documents, videos, and more. Maximum file size limits apply depending on your account.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, Sharify uses encrypted connections to ensure your files are securely transferred. You can also password-protect your shared files for additional security.",
    },
    {
      question: "How long are my files stored?",
      answer:
        "Files are stored on Sharify servers for up to 30 days after uploading. You can also manually delete files if they are no longer needed.",
    },
    {
      question: "Can I track who downloads my files?",
      answer:
        "Currently, Sharify does not offer file tracking. However, this feature is in development and will be available soon.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-teal-500">
        Frequently Asked Questions
      </h2>
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
