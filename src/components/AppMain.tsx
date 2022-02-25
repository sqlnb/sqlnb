import React from 'react';

import { Button, ButtonGroup, OverflowList } from "@blueprintjs/core";
import { Classes, Popover2 } from "@blueprintjs/popover2";


/**
 * ITabButton - Properties for the AppMain component.
 */
export interface ITabButton {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function TabButton({ label, isSelected, onSelect, onDelete }: ITabButton) {
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
 */
export default function AppMain({}: IAppMainProps) {
  const [selectedTab, setSelectedTab] = React.useState(20);
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
            items={new Array(20).fill(0).map((_, i) => i+1)}
            // TODO: Make this a dropdown...
            overflowRenderer={items => (
              <Popover2
                content={(
                  <div />
                )}
                renderTarget={(isOpen) => (
                  <Button
                    minimal
                    icon="more"
                    style={{
                      backgroundColor: isOpen ? "white" : "#f5f5f5",
                    }}
                  />
                )}
              />
            )}
            visibleItemRenderer={i => (
              <ButtonGroup 
                key={`${i}`} 
                minimal
                style={{
                  marginRight: "5px",
                  backgroundColor: i === selectedTab ? "white" : "#f5f5f5",
                }}
              >
                {/* Select the tab... */}
                <Button 
                  key={`${i}-button`}
                  text={`Tab ${i}`}
                  // active={selectedTab === i}
                  onClick={() => setSelectedTab(i)}
                />
                {/* Close the tab... */}
                <Button 
                  key={`${i}-close`}
                  text="x"
                  // active={selectedTab === i}
                  onClick={() => undefined}
                />
              </ButtonGroup>
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
