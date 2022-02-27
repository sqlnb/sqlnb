import React, { useState, createRef, useMemo } from 'react';
import { useHotkeys } from "@blueprintjs/core";
import CustomScroll from 'react-custom-scroll';
import { Scrollbars } from 'react-custom-scrollbars';

import CellStack from './cell/CellStack';
import NotebookNav, { DBConnStatus } from './NotebookNav';

import { INotebookData, INbCellData } from "./nbData";
import { demoNotebook } from './demoNbData';


const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

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

  // TODO - This should be set back to false when a new cell is selected.
  const [editorHasFocus, setEditorHasFocus] = useState<boolean>(false);

  
  const [connStatus, setConnStatus] = useState<DBConnStatus>(DBConnStatus.CONNECTED);


  const getSelectedCell = () => selected !== null ? nbData.cells[selected] : null;
  const insertCellAfter = (index: number, cell: INbCellData) => {

  }

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
      <NotebookNav 
        onSave={() => { 
          console.log("Saving...");
        }}

        onDownload={() => {
          console.log("Downloading...");
        }}

        onInsertCellBelow={() => {

        }}

        onMoveCellUp={() => {

        }}

        onMoveCellDown={() => {

        }}

        onDuplicateCell={() => {

        }}

        onDeleteCell={() => {

        }}

        onRunCell={() => {

        }}

        onInterrupt={() => {

        }}

        onRunAllCells={() => {

        }}

        onClearAllOutputs={() => {

        }}

        onResetDBConnection={() => {

        }}

        dbConnStatus={connStatus}
      />


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
              console.log("Selected cell", i);
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

            setEditorFocus: (focus: boolean) => {
              console.log("Set editor focus", i, "=", focus);
            },
          }))}
        />
      </Scrollbars>
    </div>
  );
}
