import React from 'react';
import CellEditor from './CellEditor';

/**
 * ICellProps - The props for the Cell component.
 */
export interface ICellProps {
  /**The index of the cell */
  // index: number;

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
}


/**
 * Cell is a single SQL code cell in a notebook body.
 */
export default function Cell({execIndex, code, onChange}: ICellProps) {
  return (
    <div 
      className="data-cell"
      onClick={() => {
        console.log("I just got clicked on!");
      }}
      style={{
        margin: "10px 10px",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          float: "left",
          width: "30px",
        }}
      >
        [{ execIndex || " " }]
      </div>
      <div
        style={{
          width: "calc(100% - 30px)",
          right: 0,
          marginLeft: "auto",
        }}
      >
        <CellEditor
          value={code}
          setValue={onChange}
        />
      </div>
    </div>
  );
}