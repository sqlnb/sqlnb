import React, { } from 'react';
import {
  Button,
  ButtonGroup,
  Tag,
  IconName,
  Divider,
  Icon, 
  IconSize,
  Intent,
} from '@blueprintjs/core';
import { Popover2, Tooltip2, Classes } from "@blueprintjs/popover2";

/**
 * DBConnStatus - Status of a database connection.
 */
export enum DBConnStatus {
  NOT_CONNECTED = "Not Connected",
  CONNECTED = "Connected",
  RUNNING = "Running",
  ERROR = "Error",
  INTERRUPTED = "Interrupted",
}

function getIntentFromStatus(s: DBConnStatus): (Intent | undefined) {
  switch (s) {
    case DBConnStatus.NOT_CONNECTED:
      return undefined;
    case DBConnStatus.CONNECTED:
      return "primary";
    case DBConnStatus.RUNNING:
      return "success";
    case DBConnStatus.ERROR:
      return "danger";
    case DBConnStatus.INTERRUPTED:
      return "warning";
    default:
      return undefined;
  }
}


/**
 * INotebookNavProps - Properties for the NotebookNav component.
 */
export interface INotebookNavProps {
  onSave?: () => void;
  onDownload?: () => void;

  onInsertCellBelow?: () => void;
  onMoveCellUp?: () => void;
  onMoveCellDown?: () => void;
  onDuplicateCell?: () => void;
  onDeleteCell?: () => void;

  onRunCell?: () => void;
  onInterrupt?: () => void;
  onRunAllCells?: () => void;
  onClearAllOutputs?: () => void;
  onResetDBConnection?: () => void;

  dbConnStatus?: DBConnStatus;
}

enum NavComponentType {
  BUTTON = 0,
  DIVIDER,
  STATUS_ICON,
}

enum DBStatusIcon {
  DB = "database",
  CIRCLE = "full-circle",
}

interface INavComponent {
  type: NavComponentType;
}

interface INavButton extends INavComponent {
  type: NavComponentType.BUTTON;
  icon: IconName;
  tip: string;
  onClick: () => void;
}

interface INavDivider extends INavComponent {
  type: NavComponentType.DIVIDER;
}

/**
 * INavStatus - A status icon for the nav bar.
 */
interface INavStatus extends INavComponent {
  type: NavComponentType.STATUS_ICON;
  status: DBConnStatus;
  icon: DBStatusIcon;
}

/**
 * NotebookNav is the navbar for the notebook.
 */
export default function NotebookNav({
  onSave,
  onDownload,
  onInsertCellBelow,
  onMoveCellUp,
  onMoveCellDown,
  onDuplicateCell,
  onDeleteCell,
  onRunCell,
  onInterrupt,
  onRunAllCells,
  onClearAllOutputs,
  onResetDBConnection,
  dbConnStatus,
}: INotebookNavProps) {
  const navComponents = [
    {
      type: NavComponentType.BUTTON,
      icon: "floppy-disk",
      tip: "Save Notebook",
      onClick: onSave,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "download",
      tip: "Download Notebook",
      onClick: onDownload,
    },
    {type: NavComponentType.DIVIDER},
    {
      type: NavComponentType.BUTTON,
      icon: "insert",
      tip: "Insert Cell Below",
      onClick: onInsertCellBelow,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "arrow-up",
      tip: "Move Cell Up",
      onClick: onMoveCellUp,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "arrow-down",
      tip: "Move Cell Down",
      onClick: onMoveCellDown,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "duplicate",
      tip: "Duplicate the Current Cell",
      onClick: onDuplicateCell,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "trash",
      tip: "Delete Current Cell",
      onClick: onDeleteCell,
    },
    {type: NavComponentType.DIVIDER},
    {
      type: NavComponentType.BUTTON,
      icon: "play",
      tip: "Run Current Cell",
      onClick: onRunCell,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "stop",
      tip: "Interrupt Execution",
      onClick: onInterrupt,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "fast-forward",
      tip: "Run All Cells",
      onClick: onRunAllCells,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "eraser",
      tip: "Clear All Cells",
      onClick: onClearAllOutputs,
    },
    {
      type: NavComponentType.BUTTON,
      icon: "reset",
      tip: "Reset DB Connection",
      onClick: onResetDBConnection,
    },
    {type: NavComponentType.DIVIDER},
    {
      type: NavComponentType.STATUS_ICON,
      icon: DBStatusIcon.CIRCLE,
      status: dbConnStatus,
    },
  ] as (
    INavButton  | 
    INavDivider | 
    INavStatus
  )[];
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
        {navComponents.map((navc, i) => {
          switch (navc.type) {
            case NavComponentType.BUTTON:
              return (
                <Tooltip2 
                  key={i}
                  className={Classes.TOOLTIP2_INDICATOR} 
                  content={<Tag>{navc.tip}</Tag>}
                >
                  <Button 
                    icon={navc.icon as IconName} 
                    onClick={navc.onClick}
                  />
                </Tooltip2>
              );

            case NavComponentType.STATUS_ICON:
              return (
                <div
                  style={{
                    height: "30px",
                    padding: "5px",
                    paddingTop: "7px",
                    margin: "5px auto",
                  }}
                >
                  <Icon icon={navc.icon} intent={getIntentFromStatus(navc.status)} />
                  <span
                    style={{
                      marginLeft: "6px",
                    }}
                  >
                    Status: {navc.status}
                  </span>
                </div>
              );

            case NavComponentType.DIVIDER:
              return <Divider key={i} />;
            
          }})}
      </ButtonGroup>
    </div>
  );
}
