export const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || "https://demo.jobsoid.com/api/v1/";

export const CareerSearchAPI = {
  JOBS: "jobs",
  JOB_BY_ID: "jobs/",
};

export const LookUpsAPI = {
  LOCATIONS: "locations",
  DEPARTMENTS: "departments",
  DIVISIONS: "divisions",
  FUNCTIONS: "functions",
};

export const SESSION_FILTER_KEY = "careerFilters";
