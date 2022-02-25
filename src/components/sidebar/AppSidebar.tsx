import React, { useState } from 'react';

import SidebarTabs from './SidebarTabs';
import SidebarFileBrowser from './SidebarFileBrowser';


/**
 * IAppSidebarProps - Properties for the AppSidebar component.
 */
export interface IAppSidebarProps {
}

/**
 * The app's sidebar.
 */
export default function AppSidebar({ }: IAppSidebarProps) {

  return (
    <div 
      className="app-sidebar"
      style={{
        // overflow: "auto",
        overflowX: "hidden",
      }}
    >
      <SidebarFileBrowser />
    </div>
  );
}