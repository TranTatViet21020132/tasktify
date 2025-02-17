import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface ITextEditor {
  value?: string;
  onChange?: (content: string) => void;
}

const TextEditor = forwardRef<ReactQuill, ITextEditor>(
  ({ value, onChange, ...props }, ref) => {
    const quillRef = useRef<ReactQuill>(null);

    useImperativeHandle(ref, () => quillRef.current as ReactQuill);

    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(content, _, source) => {
          if (source === 'user') {
            onChange?.(content);
          }
        }}
        modules={modules}
        className="mt-2 p-1
        dark:bg-accent-dark-500 bg-accent-light-400
         dark:border-accent-dark-500 placeholder-text-light-500
          dark:placeholder-text-dark-600 placeholder:font-archivo 
          placeholder:text-body5 border-2 font-archivo text-body5 w-full 
          outline-none rounded-lg text-text-light-600 dark:text-text-dark-600"
        {...props}
      />
    );
  });

TextEditor.displayName = 'TextEditor';

export default TextEditor;
