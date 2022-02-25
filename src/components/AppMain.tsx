import React from 'react';

import { Button, ButtonGroup, OverflowList, Menu, MenuItem, MenuDivider, Classes } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";


/**
 * IMainTabOverflowDropdownProps - Properties for the MainTabOverflowDropdown component.
 */
export interface IMainTabOverflowDropdownProps {
  items: {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
  }[];
}

export function MainTabOverflowDropdown({ items }: IMainTabOverflowDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasSelectedItem = items.some(item => item.isSelected);
  return (
    <div className="app-body-overflow-tab-menu">
      <Popover2
        minimal
        placement="bottom-start"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpened={() => setIsOpen(true)}
        content={(
          <Menu 
            className={Classes.ELEVATION_1}
          >
            <MenuDivider title="More Tabs"/>

            {items.map((item, i) => (
              <MenuItem
                icon="book"
                active={item.isSelected}
                key={i}
                text={item.label}
                onClick={item.onSelect}
                labelElement={(
                  <Button 
                    icon="small-cross" 
                    minimal
                    small
                    onClick={item.onDelete}
                    intent="danger"
                  />
                )}
              />
            ))}
          </Menu>
        )}
      >
        <Button
            minimal
            icon="more"
            style={{
              backgroundColor: hasSelectedItem || isOpen ? "white" : "#f5f5f5",
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
      </Popover2>
    </div>
  )
}


/**
 * ITabButtonProps - Properties for the AppMain component.
 */
export interface ITabButtonProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function TabButton({ label, isSelected, onSelect, onDelete }: ITabButtonProps) {
  return (
    <div
      className="app-body-tab-button"
    >
      <ButtonGroup 
        minimal
        style={{
          marginRight: "5px",
          backgroundColor: isSelected ? "white" : "#f5f5f5",
        }}
      >
        {/* Select the tab... */}
        <Button 
          key="button"
          text={label}
          onClick={onSelect}
        />
        {/* Close the tab... */}
        <Button 
          key="close"
          icon="small-cross"
          onClick={() => undefined}
          intent="danger"
        />
      </ButtonGroup>
    </div>
  );
}

/**
 * IAppMainProps - Properties for the AppMain component.
 */
export interface IAppMainProps {
}

/**
 * AppMain - The body of the notebook.
 * 
 * TODOs:
 * - Add a "new tab" button. (Possibly in a context menu?)
 * – Add "delete tab" functionality.
 * – If selected tab is overflowed, it won't be shown.
 *   ├- If an overflowed tab is selected, should the list be re-sorted?
 *   └- Ideally, the overflow would shift (possibly even with scroll). Can it be controlled?
 */
export default function AppMain({}: IAppMainProps) {
  const [selectedTab, setSelectedTab] = React.useState(20);
  const tabItems = new Array(20).fill(0).map((_, i) => i+1);
  return (
    <div 
      className="app-main"
      style={{
        overflow: "hidden",
        width: "calc(100% - 35px)",
      }}
    >
      {/* Tab to select the active notebook... */}
      <div
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ButtonGroup
          style={{
            width: "100%",
          }}
        >
          <OverflowList
            observeParents
            items={tabItems}
            overflowRenderer={items => (
              <MainTabOverflowDropdown
                items={items.map(i => ({
                  label: `Tab ${i}`,
                  isSelected: i === selectedTab,
                  onSelect: () => setSelectedTab(i),
                  onDelete: () => undefined,
                }))}
              />
            )}
            visibleItemRenderer={i => (
              <TabButton
                key={i}
                label={`Tab ${i}`}
                isSelected={i === selectedTab}
                onSelect={ () => setSelectedTab(i)}
                onDelete={ () => {
                  // TODO: Add delete tab functionality...
                }}
              />
            )}
          />
        </ButtonGroup>
      </div>

      {/* Body of the active tab... */}
      <div
        style={{
          width: "100%",
          height: "calc(100% - 35px)",
        }}
      >
        <h1>This tab is: Tab-{selectedTab}</h1>
      </div>
    </div>
  );
}
