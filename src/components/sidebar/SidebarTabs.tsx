import React, { useState } from 'react';

import { Button, ButtonGroup, Divider } from '@blueprintjs/core';

enum TabIcon {
  FILE_BROWSER = "document",
  DB_CONNECTIONS = "data-connection",
  PLUGINS = "box",
  SETTINGS = "cog",
}

/**
 * ISidebarTabsProps - Properties for the SidebarTabs component.
 */
export interface ISidebarTabsProps {
}

/**
 * The tabs for selecting the app's sidebar.
 */
export default function SidebarTabs({ }: ISidebarTabsProps) {
  const [selectedTab, setSelectedTab] = useState("files");
  const tabs = [
    {
      id: "files",
      title: "Files",
      icon: TabIcon.FILE_BROWSER,
    },
    {
      id: "connections",
      title: "DB Connections",
      icon: TabIcon.DB_CONNECTIONS,
    },
    {
      id: "plugins",
      title: "Plugins",
      icon: TabIcon.PLUGINS,
    },
  ];

  return (
    <div 
      className="app-sidebar-tabs"
      style={{
        height: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ButtonGroup
        vertical
        minimal
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {tabs.map(tab => (
          <Button
            key={tab.id}
            icon={tab.icon}
            active={selectedTab === tab.id}
            onClick={() => setSelectedTab(tab.id)}
            large
            style={{
              width: "100%",
            }}
          />
        ))}
        <div
          style={{
            flexGrow: 1,
          }}
        />
        <Divider />
        <Button 
          key="settings"
          icon={TabIcon.SETTINGS}
          active={selectedTab === "settings"}
          onClick={() => setSelectedTab("settings")}
          large
          style={{
            width: "100%",
            userSelect: "none",
          }}
        />
        <div style={{ 
          height: "10px",
        }}/>
      </ButtonGroup>
    </div>
  );
}