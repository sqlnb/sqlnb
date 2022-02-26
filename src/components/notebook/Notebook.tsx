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
  const [nextExecIndex, setNextExecIndex] = useState(
    nbData.cells.reduce((max, cell) => Math.max(max, cell.execIndex || -1), -1) + 1
  );

  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div 
      className="notebook"
      style={{
        width: "100%",
        height: "100%",
      }}
      onClick={() => {
        setSelected(null);
      }}
    >
      <CellStack
        cells={nbData.cells.map((cell, i) => ({
          execIndex: cell.execIndex,
          code: cell.source,
          selected: selected === i,
          onSelect: () => {
            console.log(`Cell ${i} selected`);
            setSelected(i);
          },
          onChange: (code: string) => setCells([
            ...nbData.cells.slice(0, i), 
            { 
              ...cell, 
              source: code,
            },
            ...nbData.cells.slice(i + 1),
          ]),
          onRun: () => { // TODO – Add run function...
            setCells([
              ...nbData.cells.slice(0, i), 
              { 
                ...cell, 
                execIndex: nextExecIndex,
              },
              ...nbData.cells.slice(i + 1),
            ]);
            setNextExecIndex(nextExecIndex+1);
          },
        }))}
      />
    </div>
  );
}
