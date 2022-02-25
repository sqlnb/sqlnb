import React, { useState, useEffect } from 'react';
import Mousetrap from 'mousetrap';

function TextArea({ value, onChange, ...props }: { value: string; onChange: (value: string) => void }) {
  return (
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        resize: "none",
      }}
      {...props}
    />
  )
}

interface ICell {
  execIndex?: number;
  index: number;
  value: string;
  buttons: ICellButtons;
  output?: string;
  setValue: (value: string) => void;
}

interface ICellButtons {
  addAbove: () => void;
  addBelow: () => void;
  moveUp: () => void; 
  moveDown: () => void; 
  deleteMe: () => void;
}

function CellGroup({ cells = [] }: { cells: ICell[] }) {
  return (
    <div>
      {cells.map((cell, index) => (
        <Cell 
          key={index}
          {...cell}
        />
      ))}
    </div>
  );
}

function Cell({ index, value, setValue, buttons }: ICell) {
  useEffect(() => {
    Mousetrap.bind('shift+enter', () => {
      buttons.addBelow();
    });
  }, []);
  return (
    <div
      className="code-cell"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
      }}
    >
      <h3>Cell #: {index}</h3>
      <TextArea
        value={value}
        onChange={setValue}
      />
      <CellButtons {...buttons}/>
    </div>
  );
}

function CellButtons({ addAbove, addBelow, moveUp, moveDown, deleteMe }: ICellButtons) {
  return (
    <div>
      <button onClick={addAbove}>Add Cell Above</button>
      <button onClick={addBelow}>Add Cell Below</button>
      <button onClick={moveUp}>Move Up</button>
      <button onClick={moveDown}>Move Down</button>
      <button onClick={deleteMe}>Delete Me</button>
    </div>
  );
}

export default function App() {
  const defaultCells = [
    "SELECT 1 + 2;",
    "",
    "SELECT * FROM users;",
  ];

  const [cells, setCells] = useState(defaultCells);

  return (
    <div className="App">
      <h1>Hello, from React!</h1>
      <CellGroup 
        cells={cells.map((c, i) => ({ 
          index: i,
          value: c,
          setValue: (value) => setCells(cells.map((c, j) => i === j ? value : c)),
          buttons: {
            addAbove: () => {
              console.log(`Adding cell above ${i}`);
              setCells([...cells.slice(0, i), "", ...cells.slice(i)]);
            }, 
            addBelow: () => {
              console.log(`Adding cell below ${i}`);
              setCells([...cells.slice(0, i + 1), "", ...cells.slice(i + 1)]);
            }, 
            moveUp: () => {
              if (i == 0) return;
              const j = i - 1;
              const c2 = [...cells];
              [c2[i], c2[j]] = [c2[j], c2[i]];
              setCells(c2);
            }, 
            moveDown: () => {
              if (i == cells.length - 1) return;
              const j = i + 1;
              const c2 = [...cells];
              [c2[i], c2[j]] = [c2[j], c2[i]];
              setCells(c2);
            }, 
            deleteMe: () => {
              setCells([...cells.slice(0, i), ...cells.slice(i + 1)]);
            },
          },
        }))} 
      />
    </div>
  );
}