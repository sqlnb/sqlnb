import React from 'react';
import CellEditor from './CellEditor';

/**
 * ICellProps - The props for the Cell component.
 */
export interface ICellProps {
  /** The cell-execution-order index of the cell */
  execIndex?: number;

  /** The SQL code for the cell */
  code: string;

  /** Is the current cell selected? */
  selected?: boolean;

  /** A function to run when the cell is selected */
  setFocus?: () => void;

  /** A function to run when the cell's code is changed */
  onChange: (code: string) => void;

  /** A function to run when the cell is executed */
  onRun: () => void;

  /** A function to run when the cell is selected */
  onSelect?: () => void;

  /** A function to run when focus changes to/from the editor */
  setEditorFocus?: (editorFocus: boolean) => void;
}


/**
 * Cell is a single SQL code cell in a notebook body.
 */
export default function Cell({execIndex, code, selected, onChange, onSelect, setEditorFocus}: ICellProps) {
  return (
    <div 
      className="data-cell"
      onClick={e => {
        onSelect && onSelect();
        e.stopPropagation();
      }}
      style={{
        margin: "10px 10px",
        marginBottom: "10px",
        border: "1px solid lightgray",
        borderRadius: "2px",
      }}
    >
      <div style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "10px",
        paddingLeft: "5px",
        borderLeft: `10px solid ${selected ? "#00bcd4" : "transparent"}`,
      }}>
        <div
          style={{
            width: "30px",
          }}
        >
          <code className=".bp3-monospace-text">
            [{ execIndex !== undefined ? execIndex : " " }]
          </code>
        </div>
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <CellEditor
            value={code}
            setValue={onChange}
            setEditorFocus={setEditorFocus}
          />
        </div>
      </div>
    </div>
  );
}