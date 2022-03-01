import React from 'react';
import Cell from './Cell';



/**
 * ICellStackProps - The props for the CellStack component.
 */
export interface ICellStackProps {
  onClick?: () => void;
  cells: {
    execIndex?: number;
    code: string;
    selected?: boolean;
    onChange: (code: string) => void;
    onRun: () => void;
    onSelect?: () => void;
    setEditorFocus?: (editorFocus: boolean) => void;
  }[];
}

/**
 * CellStack stores a list of cells in a notebook body.
 */
export default function CellStack({ onClick, cells }: ICellStackProps) {
  return (
    <div 
      className="cell-stack"
      style={{
        margin: "20px",
      }}
      onClick={onClick}
    >
      {cells.map((cell, i) => (
        <Cell
          key={i}
          execIndex={cell.execIndex}
          selected={cell.selected}
          code={cell.code}
          onChange={cell.onChange}
          onRun={cell.onRun}
          onSelect={cell.onSelect}
          setEditorFocus={cell.setEditorFocus}
        />
      ))}
    </div>
  );
}