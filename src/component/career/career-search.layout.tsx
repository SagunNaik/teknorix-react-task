import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Grid, Typography } from "@mui/material";
import React from "react";
import SearchFilterLayout from "./search-filter";

interface IProps {
  children?: ReactJSXElement;
}

const CareerSearch: React.FC<IProps> = (props: IProps) => {
  return (
    <React.Fragment>
      <Grid container direction="row" spacing={3}>
        {/* Brief Intro on career page  */}
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ my: 2 }}>
            Discover your next role
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            We are looking for smart, talented professionals with an obsession
            for building quality software products.
          </Typography>
        </Grid>

        {/* Career Search filter  */}
        <Grid item xs={12}>
          <SearchFilterLayout />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CareerSearch;
