import React, { useState, useEffect } from 'react';
import './App.css';

import {
  HotkeyConfig,
  HotkeysContext,
  HotkeysProvider,
  HotkeysTarget2
} from "@blueprintjs/core";

import Split from 'react-split';
import AppNav from './components/AppNav';
import AppSidebar from './components/sidebar/AppSidebar';
import AppMain from './components/AppMain';
import SidebarTabs, { SidebarTabType } from './components/sidebar/SidebarTabs';


export default function App() {
  const [selectedTab, setSelectedTab] = useState(SidebarTabType.FILES);
  return (
    <HotkeysProvider>
      <div 
        className="App"
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          overflow: "hidden",
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
            <SidebarTabs 
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
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
              sizes={[25, 75]}
              minSize={[150, 500]}
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
    </HotkeysProvider>
  );
}