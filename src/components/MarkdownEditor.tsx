import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useTheme } from '../contexts/ThemeContext';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <div data-color-mode={theme} className="w-full">
      <MDEditor
        value={value}
        onChange={onChange}
        preview="edit"
        height={400}
        className="w-full"
      />
    </div>
  );
}
