import React, { useState } from 'react';
import CellStack from './cell/CellStack';

import { INotebookData, INbCellData } from "./nbData";
import { demoNotebook } from './demoNbData';


/**
 * 
 *
 */
export interface INotebookProps {
}


/**
 * The main notebook body.
 */
export default function Notebook({}: INotebookProps) {
  const [nbData, setNbData] = useState<INotebookData>(demoNotebook);
  const setCells = (cells: INbCellData[]) => setNbData({
    ...nbData,
    cells: cells,
  });
  const nextExecIndex = nbData.cells.reduce((max, cell) => Math.max(max, cell.execIndex || 0), 0) + 1;

  return (
    <div className="notebook">
      <CellStack
        cells={nbData.cells.map((cell, i) => ({
          execIndex: cell.execIndex,
          code: cell.source,
          onChange: (code: string) => setCells([
            ...nbData.cells.slice(0, i), 
            { 
              ...cell, 
              source: code,
            },
            ...nbData.cells.slice(i + 1),
          ]),
          onRun: () => {}, // TODO – Add run function...
        }))}
      />
    </div>
  );
}
