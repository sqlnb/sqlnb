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
}

/**
 * CellEditor is the code editor component for a code cell.
 */
export default function CellEditor({ value, setValue }: ICellEditorProps) {
  return (
    <div className="cell-editor">
      <CodeMirror
        value={value}
        // height="200px"
        extensions={[
          sql(),
          keywordCompletion(StandardSQL, true),
        ]}
        onChange={setValue}
      />
    </div>
  );
}