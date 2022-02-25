import React from 'react';
import Cell from './Cell';

/**
 * ICellStackProps - The props for the CellStack component.
 */
export interface ICellStackProps {

}

/**
 * CellStack stores a list of cells in a notebook body.
 */
export default function CellStack({}: ICellStackProps) {
  return (
    <div className="cell-stack">
    </div>
  );
}