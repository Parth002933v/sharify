import React, { useState, useEffect } from "react";
import ActionWrapper from "@/common/ActionWrapper";
import { Editor } from "@/components/richText/editor";
import { TNote } from "@/features/note/notesAPI";
import { useDebouncedMutation } from "@/hooks/useDebouncedMutation";
import { useHashID } from "@/hooks/useHashID";
import { useNoteFetcher } from "@/hooks/useNoteFetcher";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validatePassword = (password: string): boolean => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChar = /[@#$%]/.test(password);
  const isLongEnough = password.length > 6;

  return hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;
};

export default function RichText() {
  const location = useLocation();
  const { generateAndSetHash } = useHashID();
  const { text } = useNoteFetcher({ noteType: "lexical" });
  const { debouncedMutate } = useDebouncedMutation();

  const [editorText, setEditorText] = useState(text);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showModal, setShowModal] = useState<'protect' | 'unprotect' | null>(null);

  // Handle redirection if hash not found in URL
  useEffect(() => {
    if (!location.hash) {
      generateAndSetHash();
    }
  }, [location.hash]);

  // Update text when fetched data changes
  useEffect(() => {
    setEditorText(text);
  }, [text]);

  const handleTextChange = (editorState: string) => {
    setEditorText(editorState);

    const mutationData: TNote = {
      content: editorState,
      hashID: location.hash.replace("#", ""),
      isProtected,
      noteType: "lexical",
    };
    debouncedMutate(mutationData);
  };

  const handleSave = () => {
    if (!validatePassword(password)) {
      toast.error('Password must be more than 6 characters, include at least one uppercase letter, one lowercase letter, and one special character (@,#,$,%).');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsProtected(true);
    setShowModal(null);
    toast.success('Your Document Has Been Protected.');
  };

  const handleUnprotect = () => {
    if (!enteredPassword) {
      toast.error('Please enter your password.');
      return;
    }

    if (enteredPassword !== password) {
      toast.error('Incorrect password.');
      return;
    }

    setIsProtected(false);
    setShowModal(null);
    toast.success('Document is now unprotected.');
  };

  const handleCancel = () => {
    setShowModal(null);
    setPassword('');
    setConfirmPassword('');
    setEnteredPassword('');
  };

  return (
    <ActionWrapper>
      <div className="relative flex flex-col flex-grow items-center justify-center h-full p-6 bg-gray-100">
        <button 
          onClick={() => setShowModal(isProtected ? 'unprotect' : 'protect')} 
          className="absolute top-4 right-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {isProtected ? 'Unprotect Text' : 'Protect Text'}
        </button>
        <div className="w-full max-w-4xl mx-auto flex-grow">
          {isProtected ? (
            <p className="text-lg leading-relaxed whitespace-pre-wrap bg-white p-4 border border-gray-300 rounded shadow">
              {editorText}
            </p>
          ) : (
            <Editor onChange={handleTextChange} editor={editorText} />
          )}
       
       </div>

{showModal === 'protect' && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold mb-4">Do You Want To Protect Your Text?</h2>
      <p className="mb-4">
        Make sure to remember the password. We don't store passwords, just the encrypted data. (If the password is forgotten, the data can't be accessed.)
        Longer passwords are more secure.
      </p>
      <div className="mb-4">
        <label className="block mb-1">Enter Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={handleSave} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button 
          onClick={handleCancel} 
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{showModal === 'unprotect' && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold mb-4">Enter Password to Unprotect</h2>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          onClick={handleUnprotect} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Unprotect
        </button>
        <button 
          onClick={handleCancel} 
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

<ToastContainer />
</div>
</ActionWrapper>
);
}
