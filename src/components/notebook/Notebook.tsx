import React, { useState, createRef, useMemo } from 'react';
import { useHotkeys } from "@blueprintjs/core";
import CustomScroll from 'react-custom-scroll';
import { Scrollbars } from 'react-custom-scrollbars';

import CellStack from './cell/CellStack';
import NotebookNav from './NotebookNav';

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
  // Store the notebook data.
  const [nbData, setNbData] = useState<INotebookData>(demoNotebook);
  const setCells = (cells: INbCellData[]) => setNbData({
    ...nbData,
    cells: cells,
  });

  // Store the number for the next executed cell.
  const [nextExecIndex, setNextExecIndex] = useState(
    nbData.cells.reduce((max, cell) => Math.max(max, cell.execIndex || -1), -1) + 1
  );

  // Store the current selected cell (if any) and whether or 
  // not the editor has focus or the outer cell.
  const [selected, setSelected] = useState<number | null>(0);
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);

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
      <NotebookNav />
      <Scrollbars
        style={{
          width: "100%",
          height: "calc(100% - 30px)",
        }}
      >
        <CellStack
          cells={nbData.cells.map((cell, i) => ({
            execIndex: cell.execIndex,
            code: cell.source,
            selected: selected === i,
            onSelect: () => {
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
      </Scrollbars>
    </div>
  );
}
