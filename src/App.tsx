import React, { useState, useEffect } from 'react';
import './App.css';

import Split from 'react-split';
import AppNav from './components/AppNav';
import AppSidebar from './components/sidebar/AppSidebar';
import AppMain from './components/AppMain';
import SidebarTabs from './components/sidebar/SidebarTabs';

// import { useHotkeys } from 'react-hotkeys-hook';


export default function App() {
  const defaultCells = [
    "SELECT 1 + 2;",
    "",
    "SELECT * FROM users;",
  ];

  const [cells, setCells] = useState(defaultCells);

  return (
    <div 
      className="App"
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
      }}
    >
      <AppNav />
      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
        }}
      >
        <div
          style={{
            float: "left",
            width: "50px",
            height: "100%",
          }}
        >
          <SidebarTabs />
        </div>
        <div
          style={{
            right: 0,
            marginLeft: "auto",
            width: "calc(100% - 50px)",
            height: "100%",
          }}
        >
          <Split
            sizes={[30, 70]}
            className="split"
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
            }}
          >
          <AppSidebar />
          <AppMain />
        </Split>
        </div>
      </div>
    </div>
  );
}