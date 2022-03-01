import React, { useState } from 'react';

import { 
  Button, 
  ButtonGroup,
  Divider,
} from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

export enum SidebarTabType {
  FILES = "files",
  CONNECTIONS = "connections",
  PLUGINS = "plugins",
  SETTINGS = "settings",
}

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
  selectedTab: SidebarTabType;
  onSelectTab: (tab: SidebarTabType) => void;
}

/**
 * The tabs for selecting the app's sidebar.
 */
export default function SidebarTabs({ selectedTab, onSelectTab }: ISidebarTabsProps) {
  const tabs = [
    {
      id: SidebarTabType.FILES,
      title: "Files",
      icon: TabIcon.FILE_BROWSER,
    },
    {
      id: SidebarTabType.CONNECTIONS,
      title: "DB Connections",
      icon: TabIcon.DB_CONNECTIONS,
    },
    {
      id: SidebarTabType.PLUGINS,
      title: "Plugins",
      icon: TabIcon.PLUGINS,
      disabled: true,
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
        large={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              width: "100%",
            }}
          >
            {
              tab.disabled ? (
                <Button
                  key={tab.id}
                  icon={tab.icon}
                  active={selectedTab === tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  large
                  disabled={tab.disabled}
                />
              ) : (
                <Tooltip2 content={tab.title}>
                  <Button
                    key={tab.id}
                    icon={tab.icon}
                    active={selectedTab === tab.id}
                    onClick={() => onSelectTab(tab.id)}
                    large
                    disabled={tab.disabled}
                  />
                </Tooltip2>
              )
            }
          </div>
        ))}
        <div
          style={{
            flexGrow: 1,
          }}
        />
        <Divider />
        <div>
          <Tooltip2 content="Settings">
            <Button 
              key={SidebarTabType.SETTINGS}
              icon={TabIcon.SETTINGS}
              active={selectedTab === "settings"}
              onClick={() => onSelectTab(SidebarTabType.SETTINGS)}
              large
              style={{
                width: "100%",
                userSelect: "none",
              }}
            />
          </Tooltip2>
        </div>
        <div style={{ 
          height: "10px",
        }}/>
      </ButtonGroup>
    </div>
  );
}