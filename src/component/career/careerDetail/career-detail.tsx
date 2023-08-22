import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllJobs, getJobById } from "../../../service/career/career.service";
import {
  Box,
  Divider,
  Grid,
  Chip,
  Stack,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import "./career-details.scss";
import RichTextEditor from "../../UI/rich-text-editor";
import { isArray } from "../../../utilities/utils";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const CareerDetailPage = () => {
  const { jobId = "" } = useParams();

  //All States here
  const [job, setJob] = useState<any>({});
  const [relatedJobs, setRelatedJobs] = useState<any[]>([]);

  const navigate = useNavigate();

  //all Functions here

  const getJobOpeningURL = () => window.location.href;

  const handleJobDetailFetch = () => {
    getJobById(jobId)
      .then((res) => {
        setJob(res);
        fetchRelatedJobs();
      })
      .catch((err) => console.error(err));
  };

  //Handle Related Job fetch
  const fetchRelatedJobs = () => {
    getAllJobs("")
      .then((res: any[]) => {
        //filter first 10 jobs
        const filterJobs: any[] = isArray(res) ? res.slice(0, 12) : [];

        //Remove current opening if Exists in related Jobs
        const relJobs: any[] = isArray(filterJobs)
          ? filterJobs.filter((job: any) => job?.id !== +jobId)
          : [];

        setRelatedJobs(relJobs);
      })
      .catch((err) => console.log(err));
  };

  //All Use Effects Here
  useEffect(() => {
    handleJobDetailFetch();
  }, [jobId]);

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        spacing={3}
        className="job-detail-container"
      >
        {/* Job Heading */}
        <Grid item xs={12}>
          <Grid container item className="job-heading-container pb-2">
            <Grid item xs={10}>
              <Grid item xs={12}>
                <div className="font-1 font-light-bold text-left ml-2">
                  <span>
                    {`${job?.department || "NA"} Department At ${
                      job?.company || "NA"
                    } ${job?.location?.state} `}
                  </span>
                </div>
              </Grid>
              <Grid container item spacing={0} className="ml-2">
                <Grid item xs={12}>
                  <div className="font-2 font-bold text-left  ">
                    <span>{job?.title}</span>
                  </div>
                </Grid>
              </Grid>
              <Grid container item spacing={1} className="ml-2">
                <Grid item>
                  <div className="text-left">
                    <ApartmentOutlinedIcon />
                    <span> {job?.title}</span>
                  </div>
                </Grid>
                <Grid item>
                  <div className="text-left">
                    <LocationOnOutlinedIcon />
                    <span> {job?.location?.title}</span>
                  </div>
                </Grid>
                <Grid item>
                  <div className="text-left">
                    <Chip label={`${job?.type || "NA"}`} />
                  </div>
                </Grid>
              </Grid>
              {/* </Grid> */}
              <Grid container item className="mt-2 ml-2">
                <Grid item xs={4}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ borderRadius: 4 }}
                      href={job?.applyUrl}
                    >
                      Apply
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Job Description */}
        <Grid item xs={12}>
          <Grid container item className="mt-2  " columnSpacing={3}>
            <Grid item xs={12} sm={8}>
              <div className="justify-text">
                <RichTextEditor text={job?.description} />
              </div>
            </Grid>

            {/* Related Jobs And Social Share */}
            <Grid item xs={12} sm={4}>
              <Grid container item spacing={1}>
                {/* Related Jobs */}
                <Grid item xs={12} className="related-jobs p-1 mt-2 ">
                  <Grid container item>
                    <Grid item xs={12}>
                      <div className="related-job-heading text-left">
                        <span className="h3">OTHER JOB OPENINGS</span>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container item>
                    <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
                      {isArray(relatedJobs) ? (
                        relatedJobs?.map((relJob) => (
                          <>
                            <Grid container spacing={1} className="mt-2">
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <div
                                    className="related-job-title text-left font-bold"
                                    onClick={() =>
                                      navigate(`/job-detail/${relJob?.id}`, {
                                        replace: true,
                                      })
                                    }
                                  >
                                    {" "}
                                    {relJob?.title}
                                  </div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={1}>
                                <Grid item>
                                  <div className="related-job-sub-heading">
                                    <ApartmentOutlinedIcon />
                                    <span> {relJob?.title}</span>
                                  </div>
                                </Grid>
                                <Grid item>
                                  <div className="related-job-sub-heading">
                                    <LocationOnOutlinedIcon />
                                    <span> {relJob?.location?.title}</span>
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        ))
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Grid>
                </Grid>

                {/* Social Share */}
                <Grid item xs={12}>
                  <Grid item xs={12} className="mt-2 p-1 ">
                    <Grid container item>
                      <Grid item xs={12}>
                        <div className="related-job-heading text-left">
                          <span className="h3">SHARE JOB OPENINGS</span>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2 }}
                      >
                        <IconButton
                          href={`https://www.facebook.com/sharer/sharer.php?u=${getJobOpeningURL()}`}
                          target="_blank"
                        >
                          <FacebookOutlinedIcon />
                        </IconButton>

                        <IconButton
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${getJobOpeningURL()}`}
                          target="_blank"
                        >
                          <LinkedInIcon />
                        </IconButton>

                        <IconButton
                          href={`http://twitter.com/share?text=Job Openings at ${
                            job?.company
                          }&url=${getJobOpeningURL()}&hashtags=${job?.title?.trim()}`}
                          target="_blank"
                        >
                          <TwitterIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CareerDetailPage;
