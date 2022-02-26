import React, { useState } from 'react';
import {
  Navbar,
  Button,
  ButtonGroup,
} from '@blueprintjs/core';


/**
 * INotebookNavProps - Properties for the NotebookNav component.
 */
export interface INotebookNavProps {
}


/**
 * NotebookNav is the navbar for the notebook.
 */
export default function NotebookNav({}: INotebookNavProps) {
  return (
    <div
      className="nb-nav-container"
      style={{
        borderBottom: "2px solid #e6e6e6",
      }}
    >
      <ButtonGroup>
        <Button minimal icon="home" text="Home" />
        <Button minimal icon="document" text="Files" />
      </ButtonGroup>
      <div 
        className="nav-gradient"
        style={{
          width: "100%",
          height: "15px",
          position: "fixed",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))",
          zIndex: 1,
        }}
      />
    </div>
  );
}
