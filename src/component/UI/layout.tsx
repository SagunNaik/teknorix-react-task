import React from "react";

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Container, Box, Toolbar } from "@mui/material";
import AppHeader from "./app-header";

interface IProps {
  children?: ReactJSXElement;
}

const Layout: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Container>
        <AppHeader />
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
