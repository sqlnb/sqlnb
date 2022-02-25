import React, { useState } from 'react';

import { Tabs, Tab, Icon } from '@blueprintjs/core';

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
      }}
    >
      <Tabs 
        id="app-sidebar-tabs-container" 
        onChange={id => setSelectedTab(id as string)} 
        selectedTabId={selectedTab}
        vertical
      >
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            id={tab.id}
            // title={tab.title}
            title={<Icon icon={tab.icon} />}
          />
        ))}
        <Tabs.Expander />
        <Tab id="bb" disabled title="Backbone" />
      </Tabs>
    </div>
  );
}