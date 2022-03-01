import React, { useState } from 'react';

import { 
  Tree, 
  TreeNodeInfo,
  Button,
  ButtonGroup,
  Divider,
} from '@blueprintjs/core';
import { Classes, Tooltip2 } from "@blueprintjs/popover2";

import { Scrollbars } from 'react-custom-scrollbars';


const demoContents = [
  {
    name: "data",
    contents: [
      {
        name: "part-1.csv",
      },
      {
        name: "part-2.csv",
      },
      {
        name: "composite.csv",
      },
    ],
  },
  {
    name: "README.md",
  },
  {
    name: "users.dbnb",
  },
  {
    name: "reports.dbnb",
  },
  {
    name: "data.csv",
  },
  {
    name: "bigFolder",
    contents: [
      {
        name: "README.md",
      },
      {
        name: "users.dbnb",
      },
      {
        name: "reports.dbnb",
      },
      {
        name: "nested",
        contents: [
          {
            name: "bigFolder",
            contents: [
              {
                name: "README.md",
              },
              {
                name: "users.dbnb",
              },
              {
                name: "reports.dbnb",
              },
              {
                name: "double-nested",
                contents: [
                  {
                    name: "nested",
                    contents: [
                      {
                        name: "bigFolder",
                        contents: [
                          {
                            name: "README.md",
                          },
                          {
                            name: "users.dbnb",
                          },
                          {
                            name: "reports.dbnb",
                          },
                          
                        ],
                      },
                    ],
                  }
                ],
              }
            ],
          },
        ],
      }
    ],
  },
];

/**
 * FileTreeIcon is an enum that stores icon names
 * used in the FileTree component.
 */
enum FileTreeIcon {
  DOCUMENT      = 'document',
  FOLDER_CLOSED = 'folder-close',
  FOLDER_OPEN   = 'folder-open',
  NOTEBOOK      = "book",
}

export interface File { 
  name: string;
}

export interface Folder {
  name: string;
  contents: (File | Folder)[];
}

interface FileOrFolder {
  id: string;
  icon: string;
  label: string;
  isSelected: boolean;
  isExpanded: boolean | undefined;
  childNodes: FileOrFolder[] | undefined;
  nodeData?: any;
}

export interface IFileTreeButtonsProps {
  onNewFile?: () => void; // TODO – Create a new-file launcher popup component
  onNewFolder?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
  onChangeDirectory?: () => void;
}

export function FileTreeButtons({
  onNewFile,
  onNewFolder,
  onDelete,
  onRefresh,
  onChangeDirectory,
}: IFileTreeButtonsProps) {
  return (
    <div 
      className="file-tree-button-group"
      style={{
        width: "100%",
      }}
    >
      <ButtonGroup 
        minimal
        fill
      >
        <Tooltip2 content="New File">
          <Button
            onClick={onNewFile}
            intent="primary"
            icon="plus"
          />
        </Tooltip2>
        <Tooltip2 content="New Folder">
          <Button
            onClick={onNewFolder}
            icon="folder-new"
          />
        </Tooltip2>
        <Tooltip2 content="Delete">
          <Button
            onClick={onDelete}
            icon="trash"
          />
        </Tooltip2>
        <Tooltip2 content="Refresh Explorer">
          <Button
            onClick={onRefresh}
            icon="refresh"
          />
        </Tooltip2>
        <Tooltip2 content="Change Working Directory">
          <Button
            onClick={onChangeDirectory}
            icon="exchange"
          />
        </Tooltip2>
      </ButtonGroup>
    </div>
  );
}


export interface IFileTreeProps {
  contents: (File | Folder)[];
}

// TODO – Lazy render FS tree?
// TODO – Add a search bar?
/**
 * FileTree displays a file system tree in the side panel.
 */
function FileTree({ contents }: IFileTreeProps) {
  const [selected, setSelected] = useState("");
  const [_expanded, _setExpanded] = useState<string[]>([]);

  const isExpanded = (id: string) => _expanded.includes(id);
  const setExpanded = (id: string) => {
    if (!isExpanded(id)) {
      _setExpanded([..._expanded, id]);
    }
  };
  const setCollapsed = (id: string) => {
    if (isExpanded(id)) {
      _setExpanded(_expanded.reduce((acc, curr) => ( curr === id ? acc : [...acc, id] ), []));
    }
  }

  const formatFileOrFolder = (f: File | Folder, index: number, idPrefix: string = ""): FileOrFolder => {
    const id = `${idPrefix}${index}`;
    const isSelected = selected === id;
    const isFolder = "contents" in f;
    return {
      id: id,
      label: f.name,
      icon: (
        isFolder ? (
          isExpanded(id) ? 
            FileTreeIcon.FOLDER_OPEN : 
            FileTreeIcon.FOLDER_CLOSED
        ) : (
          f.name.toLowerCase().endsWith(".dbnb") ?
            FileTreeIcon.NOTEBOOK :
            FileTreeIcon.DOCUMENT
        )
      ),
      isSelected: isSelected,
      isExpanded: isFolder ? isExpanded(id) : undefined,
      childNodes: isFolder ? f.contents.map((c, i) => formatFileOrFolder(c, i, `${id}/`)) : undefined,
    };
  };

  return (
    <Tree 
      contents={contents.map((f, i) => formatFileOrFolder(f, i)) as TreeNodeInfo[]}
      onNodeClick={node => {
        console.log("Just selected:", node);
        setSelected(node.id as string)
      }}
      onNodeExpand={node => setExpanded(node.id as string)}
      onNodeCollapse={node => setCollapsed(node.id as string)}
    />
  )
}

/**
 * IAppSidebarProps - Properties for the AppSidebar component.
 */
export interface IAppSidebarProps {
  contents?: (File | Folder)[];
}

/**
 * The app's sidebar.
 */
export default function AppSidebar({ contents }: IAppSidebarProps) {
  return (
    <div 
      className="app-sidebar"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <FileTreeButtons />
      <Divider />

      <Scrollbars
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div>
          <FileTree 
            contents={contents || demoContents} 
          />
        </div>
      </Scrollbars>
    </div>
  );
}