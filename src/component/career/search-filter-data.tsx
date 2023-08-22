import { Grid, Button, Stack, Chip } from "@mui/material";
import React, { ReactNode, FC } from "react";
import "./search-filter-data.scss";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { isArray } from "../../utilities/utils";
import { useNavigate } from "react-router-dom";

interface IProps {
  childrens?: ReactNode;
  data: any[];
}

const SearchFilterData: FC<IProps> = ({ data = [], childrens }: IProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        className="search-filter-data-container"
        alignItems="center"
      >
        {isArray(data) ? (
          data?.map((job) => (
            <>
              <Grid container item spacing={3} className="mt-1">
                {/* Job Descriptions Header */}
                <Grid item xs={12}>
                  <div className="job-depart-heading text-align-left">
                    <span className="h3"> {job?.title}</span>
                  </div>
                </Grid>

                {/* Job Listing */}
                <Grid
                  container
                  spacing={3}
                  className="mt-1"
                  alignItems="center"
                >
                  {/* Job Title listing */}
                  <Grid item xs={12} sm={9}>
                    <Grid container spacing={1} className="ml-2">
                      <Grid item xs={12}>
                        <div className="job-title text-align-left ml-2">
                          {" "}
                          {job?.title}
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} className="ml-2">
                      <Grid item>
                        <div className="job-category-container text-align-center ml-2">
                          <ApartmentOutlinedIcon />
                          <span> {job?.title}</span>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="job-category-container text-align-center">
                          <LocationOnOutlinedIcon />
                          <span> {job?.location?.title}</span>
                        </div>
                      </Grid>
                      <Grid item>
                        <div className="job-category-container text-align-center">
                          <Chip label={`${job?.type || "NA"}`} />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={12} sm={3}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2 }}
                    >
                      <Button
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 4 }}
                        href={job?.applyUrl}
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(`/job-detail/${job?.id}`, { replace: true })
                        }
                      >
                        View
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default SearchFilterData;
