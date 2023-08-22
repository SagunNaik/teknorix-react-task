import { CareerSearchAPI } from "../../utilities/constants";
import { getCall } from "../service";

const { JOBS, JOB_BY_ID } = CareerSearchAPI;

export const getAllJobs = (query: string) =>
  getCall(`${JOBS}${query}`)
    .then((res) => res)
    .catch((error) => error);

export const getJobById = (id: string) =>
  getCall(`${JOB_BY_ID}${id}`)
    .then((res) => res)
    .catch((error) => error);
