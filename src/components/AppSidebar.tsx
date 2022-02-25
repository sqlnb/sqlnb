import React, { useState } from 'react';

import { Tree } from '@blueprintjs/core';

interface File {
  name: string;
}

interface Folder {
  name: string;
  contents: (File | Folder)[];
}

interface FileOrFolder {
  id: string;
  // icon: string;
  label: string;
  isSelected: boolean;
  isExpanded: boolean | undefined;
  childNodes: FileOrFolder[] | undefined;
}

function FileTree({ contents }: { contents: (File | Folder)[] }) {
  const [selected, setSelected] = useState("");
  const [_expanded, _setExpanded] = useState<string[]>([]);
  const isExpanded = (id: string) => _expanded.includes(id);
  const setExpanded = (id: string) => {
    if (!isExpanded(id)) {
      _setExpanded([..._expanded, id]);
    }
  }
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
      // icon: isFolder ? ("folder-close") : "document",
      isSelected: isSelected,
      isExpanded: isFolder ? isExpanded(id) : undefined,
      childNodes: isFolder ? f.contents.map((c, i) => formatFileOrFolder(c, i, `${id}.`)) : undefined,
    };
  };

  return (
    <Tree 
      contents={contents.map((f, i) => formatFileOrFolder(f, i))}
      onNodeClick={node => setSelected(node.id as string)}
      onNodeExpand={node => setExpanded(node.id as string)}
      onNodeCollapse={node => setCollapsed(node.id as string)}
    />
  )
}

/**
 * The app's sidebar.
 */
export default function AppSidebar() {
  return (
    <div className="app-sidebar">
      <p>Sidebar...</p>
      <FileTree 
        contents={[
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
      ]} />

      {/* // <Tree 
      //   contents={[
      //     {
      //       id: '1',
      //       label: "data",
      //       isExpanded: true,
      //       childNodes: [
      //         {
      //           id: '1.1',
      //           label: "part-1.csv",
      //         },
      //         {
      //           id: '1.2',
      //           label: "part-2.csv",
      //         },
      //         {
      //           id: '1.3',
      //           label: "composite.csv",
      //         },
      //       ],
      //     },
      //     {
      //       id: '2',
      //       label: "README.md",
      //     },
      //     {
      //       id: '3',
      //       label: "users.dbnb",
      //     },
      //     {
      //       id: '4',
      //       label: "reports.dbnb",
      //       isSelected: true,
      //     },
      //     {
      //       id: '5',
      //       label: "data.csv",
      //     },
      //   ]}
      // /> */}
    </div>
  );
}