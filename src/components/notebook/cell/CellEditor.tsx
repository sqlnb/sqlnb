import React, { useRef, useEffect } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

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
  const ref = useRef<CodeMirror>(null);
  useEffect(() => {
    // @ts-ignore: TS2339
    ref.current.editor.display.wrapper.style.height = "auto";
  }, []);
  return (
    <div className="cell-editor">
      <CodeMirror
        ref={ref}
        value={value}
        options={{
          mode: "sql",
          lineNumbers: true,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => setValue(value)}
        onChange={(editor, data, value) => {
          // // @ts-ignore: TS2339
          // ref.current.editor.display.wrapper.style.height = "auto";
        }}
        onFocus={() => setEditorFocus && setEditorFocus(true)}
        onBlur={() => setEditorFocus && setEditorFocus(false)}
        
      />
    </div>
  );
}