import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { 
  sql,
  keywordCompletion,
  StandardSQL,
} from '@codemirror/lang-sql';

/**
 * ICellEditorProps - The props for the CellEditor component.
 */
export interface ICellEditorProps {
  /** The current SQL code in the editor */
  value: string;

  /** A function to run when the editor's value is changed */
  setValue: (value: string) => void;

  /** A function to run when focus changes to/from the editor */
  setEditorFocus?: (editorFocus: boolean) => void;
}

/**
 * CellEditor is the code editor component for a code cell.
 */
export default function CellEditor({ value, setValue, setEditorFocus }: ICellEditorProps) {
  return (
    <div className="cell-editor">
      <CodeMirror
        value={value}
        extensions={[
          sql(),
          keywordCompletion(StandardSQL, true),
        ]}
        onChange={setValue}
        onFocus={() => setEditorFocus && setEditorFocus(true)}
        onBlur={() => setEditorFocus && setEditorFocus(false)}
      />
    </div>
  );
}