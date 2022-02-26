import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Tag,
  IconName,
  Divider,
} from '@blueprintjs/core';
import { Popover2, Tooltip2, Classes } from "@blueprintjs/popover2";


/**
 * INotebookNavProps - Properties for the NotebookNav component.
 */
export interface INotebookNavProps {
}


interface INavButton {
  icon: IconName;
  tip: string;
  onClick: () => void;
}

interface INavDivider {
  divider: boolean;
}


/**
 * NotebookNav is the navbar for the notebook.
 */
export default function NotebookNav({}: INotebookNavProps) {
  const buttons = [
    {
      icon: "floppy-disk",
      tip: "Save Notebook",
      onClick: () => {},
    },
    {
      icon: "download",
      tip: "Download Notebook",
      onClick: () => {},
    },
    {divider: true},
    {
      icon: "insert",
      tip: "Insert Cell Below",
      onClick: () => {},
    },
    {
      icon: "arrow-up",
      tip: "Move Cell Up",
      onClick: () => {},
    },
    {
      icon: "arrow-down",
      tip: "Move Cell Down",
      onClick: () => {},
    },
    {
      icon: "duplicate",
      tip: "Duplicate the Current Cell",
      onClick: () => {},
    },
    {
      icon: "trash",
      tip: "Delete Current Cell",
      onClick: () => {},
    },
    {divider: true},
    {
      icon: "play",
      tip: "Run Current Cell",
      onClick: () => {},
    },
    {
      icon: "stop",
      tip: "Interrupt Execution",
      onClick: () => {},
    },
    {
      icon: "fast-forward",
      tip: "Run All Cells",
      onClick: () => {},
    },
    {
      icon: "eraser",
      tip: "Clear All Cells",
      onClick: () => {},
    },
    {
      icon: "reset",
      tip: "Reset DB Connection",
      onClick: () => {},
    },
  ] as (INavButton | INavDivider)[];
  return (
    <div
      className="nb-nav-container"
      style={{
        borderBottom: "2px solid #e6e6e6",
      }}
    >
      <ButtonGroup 
        minimal 
        large
        style={{
          marginLeft: "20px",
        }}
      >
        {buttons.map((button, i) => (
          "divider" in button ? (
            <Divider key={i} />
          ) : (
            <Tooltip2 
              key={i}
              className={Classes.TOOLTIP2_INDICATOR} 
              content={<Tag>{button.tip}</Tag>}
            >
              <Button 
                icon={button.icon as IconName} 
                onClick={button.onClick}
              />
            </Tooltip2>
          )
        ))}
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
