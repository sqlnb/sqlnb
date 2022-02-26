import React, { useState } from 'react';
import SidebarFileBrowser from './SidebarFileBrowser';


/**
 * IAppSidebarProps - Properties for the AppSidebar component.
 */
export interface IAppSidebarProps {
}

/**
 * The app's sidebar.
 */
export default function AppSidebar({}: IAppSidebarProps) {

  return (
    <div 
      className="app-sidebar"
    >
      <SidebarFileBrowser />
    </div>
  );
}