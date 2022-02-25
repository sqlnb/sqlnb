import React from 'react';

import { Navbar, Button } from "@blueprintjs/core";

/**
 * The app's navbar.
 */
export default function AppNav() {
  return (
    <div className="app-nav">
      <Navbar>
        <Navbar.Group>
            <Navbar.Heading>SQLNb</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
