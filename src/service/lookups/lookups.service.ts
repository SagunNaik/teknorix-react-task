import { LookUpsAPI } from "../../utilities/constants";
import { getCall } from "../service";

const { DEPARTMENTS, DIVISIONS, FUNCTIONS, LOCATIONS } = LookUpsAPI;

export const getLocations = () =>
  getCall(LOCATIONS)
    .then((res) => res)
    .catch((error) => error);

export const getDepartments = () =>
  getCall(DEPARTMENTS)
    .then((res) => res)
    .catch((error) => error);

export const getDivisions = () =>
  getCall(DIVISIONS)
    .then((res) => res)
    .catch((error) => error);

export const getFunctions = () =>
  getCall(FUNCTIONS)
    .then((res) => res)
    .catch((error) => error);
