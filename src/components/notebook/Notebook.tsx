import React, { useState, createRef, useMemo } from 'react';
import { useHotkeys } from "@blueprintjs/core";
import { Scrollbars } from 'react-custom-scrollbars';

import CellStack from './cell/CellStack';
import NotebookNav, { DBConnStatus } from './NotebookNav';

import { INotebookData, INbCellData, NbCellType } from "./nbData";
import { demoNotebook } from './demoNbData';


const clone = <T, >(obj: T): T => JSON.parse(JSON.stringify(obj));


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


  const getSelectedCell = () => selected !== null ? clone(nbData.cells[selected]) : null;

  const insertCellAfter = (index: number, cell: INbCellData) => {
    const updatedData = {
      ...nbData,
      cells: [
        ...nbData.cells.slice(0, index + 1),
        cell,
        ...nbData.cells.slice(index + 1),
      ],
    };

    // Insert the new cell
    setNbData(updatedData);
  }

  return (
    <div 
      className="notebook"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <NotebookNav 
        onSave={() => { 
          console.log("Saving..."); // TODO - Add saving functionality.
        }}

        onDownload={() => {
          console.log("Downloading..."); // TODO - Add download functionality.
        }}

        onInsertCellBelow={() => {
          console.log("Inserting cell...")
          const i = selected !== null ? selected : nbData.cells.length - 1;
          insertCellAfter(i, {
            type: NbCellType.CODE,
            source: "",
          });
          setSelected(i + 1);
        }}

        onMoveCellUp={() => {
          if (
            selected === null || 
            selected === 0
          ) return;

          const cells = clone(nbData.cells);
          setCells([
            ...cells.slice(0, selected - 1),
            cells[selected],
            cells[selected - 1],
            ...cells.slice(selected + 1),
          ]);
          setSelected(selected - 1);
        }}

        onMoveCellDown={() => {
          if (
            selected === null ||
            selected === nbData.cells.length - 1
          ) return;
          const cells = clone(nbData.cells);
          setCells([
            ...cells.slice(0, selected),
            cells[selected + 1],
            cells[selected],
            ...cells.slice(selected + 2),
          ]);
          setSelected(selected + 1);
        }}

        onDuplicateCell={() => {
          if (selected === null) return;

          const c = getSelectedCell();
          insertCellAfter(
            selected, 
            {
            ...(c !== null ? clone(c) : {
              type: NbCellType.CODE,
              source: "",
            }),
            execIndex: undefined,
          },
          );
          setSelected(selected + 1);
        }}

        onDeleteCell={() => {
          if (selected === null) return;

          if (nbData.cells.length <= 1)
            return setCells([{
              type: NbCellType.CODE,
              source: "",
            }]);

          const cells = clone(nbData.cells);
          setCells([
            ...cells.slice(0, selected),
            ...cells.slice(selected + 1),
          ]);
          setSelected(Math.max(0, selected - 1));
        }}

        onRunCell={() => {
          // Is there a selected cell?
          if (selected === null) return;

          // Set the execIndex of the selected cell.
          // TODO – Actually run the cell...
          setCells(clone(nbData.cells).map((c, i) => (
            i === selected ? {
              ...c,
              execIndex: nextExecIndex,
            } : c
          )));

          // If the selected cell is the last cell, add a new cell.
          if (selected === nbData.cells.length - 1)
            insertCellAfter(selected, {
              type: NbCellType.CODE,
              source: "",
            });

          // Increment the next exec index.
          setNextExecIndex(nextExecIndex + 1);

          // Set the selected cell to the next cell.
          setSelected(selected + 1);
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
        onClick={() => {
          console.log("Clicked notebook outside of cell. Unselecting.")
          setSelected(null);
        }}
      >
        <div
          className="nb-body-container"
          style={{
            width: "100%",
            height: "calc(100% - 50px)",
            paddingBottom: "50px",
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
                // setNextExecIndex(nextExecIndex+1);
              },

              setEditorFocus: (focus: boolean) => {
                console.log("Set editor focus", i, "=", focus);
              },
            }))}
          />
        </div>
      </Scrollbars>
    </div>
  );
}
