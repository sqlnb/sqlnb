import React from 'react';
import Cell from './Cell';



/**
 * ICellStackProps - The props for the CellStack component.
 */
export interface ICellStackProps {
  cells: {
    execIndex?: number;
    code: string;
    onChange: (code: string) => void;
    onRun: () => void;
  }[];
}

/**
 * CellStack stores a list of cells in a notebook body.
 */
export default function CellStack({ cells }: ICellStackProps) {
  return (
    <div className="cell-stack">
      {cells.map((cell, i) => (
        <Cell
          key={i}
          execIndex={cell.execIndex}
          code={cell.code}
          onChange={cell.onChange}
          onRun={cell.onRun}
        />
      ))}
    </div>
  );
}