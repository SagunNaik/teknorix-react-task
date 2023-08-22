import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import "./search-filter.scss";
import SearchIcon from "@mui/icons-material/Search";
import {
  DepartmentsTypes,
  DivisionsTypes,
  FunctionsTypes,
  LocationsTypes,
} from "./interfaces/lookups.interface";
import { getSessionItem, isArray, setSessionItem } from "../../utilities/utils";
import {
  getDepartments,
  getFunctions,
  getLocations,
} from "../../service/lookups/lookups.service";
import { SESSION_FILTER_KEY } from "../../utilities/constants";
import { getAllJobs } from "../../service/career/career.service";
import SearchFilterData from "./search-filter-data";

interface FilterTypes {
  searchKeyword: string;
  department: string;
  location: string;
  function: string;
}

export interface SelectedFilters {
  id: number;
  type: string;
  title: string;
}

const filterDefaults: FilterTypes = {
  searchKeyword: "",
  department: "",
  location: "",
  function: "",
};

const SearchFilterLayout = () => {
  // All context  here

  // All react States here
  const [firstPageLoad, setFirstPageLoad] = React.useState<boolean>(true);

  const [selectedFilters, setSelectedFilters] = React.useState<
    SelectedFilters[]
  >([]);

  const [jobsData, setJobsData] = React.useState<any[]>([]);

  const [filterValue, setFilterValue] =
    React.useState<FilterTypes>(filterDefaults);

  const [locations, setLocations] = React.useState<LocationsTypes[]>([]);
  const [departments, setDepartments] = React.useState<DepartmentsTypes[]>([]);
  //const [divisions, setDivisions] = React.useState<DivisionsTypes[]>([]);
  const [functions, setFunctions] = React.useState<FunctionsTypes[]>([]);

  // All functions here
  const handleChange = (key: keyof FilterTypes) => (e: any) => {
    const { name, value } = e.target;

    if (!name) return;

    setFilterValue((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (name !== "searchKeyword") handleAddSelectedFilter(key, value);
  };

  //add new filter to the list
  const handleAddSelectedFilter = (key: keyof FilterTypes, value: any) => {
    let title = "";
    switch (key) {
      case "department": {
        const data = departments?.filter((ele) => ele.id === value);
        title = data[0].title;
        break;
      }
      case "location": {
        const data = locations?.filter((ele) => ele.id === value);
        title = data[0].title;
        break;
      }
      case "function": {
        const data = functions?.filter((ele) => ele.id === value);
        title = data[0].title;
        break;
      }
      case "searchKeyword": {
        title = value;
        break;
      }

      default:
        break;
    }

    const newFilter = { id: value, type: key, title: title };
    setSelectedFilters((prev) => [...prev, newFilter]);
  };

  //Save changed filters to session storage
  const handleFilterChanges = () => {
    setSessionItem(SESSION_FILTER_KEY, JSON.stringify(selectedFilters));
  };

  //handle filter deletion by index
  const handleFilterDelete = (index: number) => () => {
    if (isArray(selectedFilters) && selectedFilters?.length === 1) {
      handleClearAllFilter();
      return;
    }

    const selectedFiltersCopy: SelectedFilters[] = JSON.parse(
      JSON.stringify(selectedFilters)
    );

    selectedFiltersCopy.splice(index, 1);

    setSelectedFilters(selectedFiltersCopy);
    handleJobsSearch();
  };

  //handle filter clear all
  const handleClearAllFilter = () => {
    setSelectedFilters([]);
    setFilterValue(filterDefaults);
  };

  //get all data from api
  const fetchAllData = async () => {
    try {
      const locationsData: LocationsTypes[] = await getLocations();
      const departmentsData: DepartmentsTypes[] = await getDepartments();
      const functionsData: FunctionsTypes[] = await getFunctions();

      setLocations(locationsData);
      setDepartments(departmentsData);
      setFunctions(functionsData);
    } catch (error) {
      console.error(error);
    }
  };

  //Handle Job search
  const handleJobsSearch = async () => {
    // const q = filterValue.searchKeyword;
    // let loc = "";
    // let dept = "";
    // let div = "";
    // let fun = "";

    // if (isArray(selectedFilters)) {
    //   loc = selectedFilters
    //     ?.filter((ele) => {
    //       if (ele.type === "location") {
    //         return ele.id;
    //       }
    //     })
    //     ?.map((e) => e.id)
    //     ?.join(",");

    //   dept = selectedFilters
    //     ?.filter((ele) => {
    //       if (ele.type === "department") {
    //         return ele.id;
    //       }
    //     })
    //     ?.map((e) => e.id)
    //     ?.join(",");

    //   fun = selectedFilters
    //     ?.filter((ele) => {
    //       if (ele.type === "function") {
    //         return ele.id;
    //       }
    //     })
    //     ?.map((e) => e.id)
    //     ?.join(",");
    // }

    //const query = `?q=${q}&loc=${loc}&dept=${dept}&div=${div}&fun=${fun}`;

    const searchParams = new URLSearchParams();

    //Build Query String
    if (filterValue.searchKeyword !== "") {
      searchParams.append("q", filterValue.searchKeyword);
    }
    if (filterValue.location !== "") {
      searchParams.append("loc", filterValue.location);
    }
    if (filterValue.department !== "") {
      searchParams.append("dept", filterValue.department);
    }
    if (filterValue.function !== "") {
      searchParams.append("fun", filterValue.function);
    }

    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";

    getAllJobs(query)
      .then((res) => setJobsData(res))
      .catch((error) => console.error(error));
  };

  // All useEffects here
  useEffect(() => {
    if (firstPageLoad) {
      fetchAllData();
      const storedFilters = getSessionItem(SESSION_FILTER_KEY);

      if (storedFilters) {
        setSelectedFilters(storedFilters);
      }
      setFirstPageLoad(false);
    }
  }, []);

  useEffect(() => {
    handleFilterChanges();
    handleJobsSearch();
  }, [selectedFilters]);

  return (
    <React.Fragment>
      <Box className="search-filter-container">
        <Grid container rowSpacing={3}>
          {/* Search filters here */}
          <Grid container item spacing={1} className="section-container">
            {/* Search Filter Text Field */}
            <Grid container item columnSpacing={2} className="mx-2">
              <Grid item sm={12} xs={12}>
                <FormControl fullWidth variant="outlined" className="bg-white">
                  <OutlinedInput
                    type="search"
                    // size="small"
                    placeholder="Search for Job"
                    value={filterValue.searchKeyword}
                    name="searchKeyword"
                    onChange={handleChange("searchKeyword")}
                    onBlur={() => {
                      handleAddSelectedFilter(
                        "searchKeyword",
                        filterValue.searchKeyword
                      );
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Search Filter Dropsdown */}
            <Grid container item columnSpacing={2} className="mx-2 pb-2 mt-2">
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth className="bg-white">
                  <Select
                    id="demo-simple-select-department"
                    value={filterValue.department}
                    name="department"
                    placeholder="Department"
                    onChange={handleChange("department")}
                    size="small"
                    input={<OutlinedInput />}
                    displayEmpty
                    renderValue={
                      filterValue.department !== ""
                        ? undefined
                        : () => <em>Department</em>
                    }
                  >
                    {isArray(departments) &&
                      departments?.map((dept) => (
                        <MenuItem key={dept?.id} value={dept?.id}>
                          {dept?.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControl fullWidth className="bg-white">
                  <Select
                    id="demo-simple-select-location"
                    value={filterValue.location}
                    name="location"
                    placeholder="Location"
                    onChange={handleChange("location")}
                    size="small"
                    input={<OutlinedInput />}
                    displayEmpty
                    renderValue={
                      filterValue.location !== ""
                        ? undefined
                        : () => <em>Location</em>
                    }
                  >
                    {isArray(locations) &&
                      locations?.map((loc) => (
                        <MenuItem key={loc?.id} value={loc?.id}>
                          {loc?.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={4} xs={12}>
                <FormControl fullWidth className="bg-white">
                  <Select
                    id="demo-simple-select-function"
                    value={filterValue.function}
                    name="function"
                    placeholder="Function"
                    onChange={handleChange("function")}
                    size="small"
                    input={<OutlinedInput />}
                    displayEmpty
                    renderValue={
                      filterValue.function !== ""
                        ? undefined
                        : () => <em>Function</em>
                    }
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {isArray(functions) &&
                      functions?.map((fun) => (
                        <MenuItem key={fun?.id} value={fun?.id}>
                          {fun?.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Applied Filter List */}
          {isArray(selectedFilters) ? (
            <Grid container item spacing={1}>
              <Grid container item className="section-container">
                <Grid container item className="mx-2">
                  <Grid item sm={10} xs={10}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2 }}
                      useFlexGap={true}
                      flexWrap="wrap"
                    >
                      {selectedFilters?.map((filter, index) => (
                        <Chip
                          key={`${filter.id}-${filter?.title}`}
                          label={filter?.title}
                          variant="outlined"
                          onDelete={handleFilterDelete(index)}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item sm={2} xs={2}>
                    <Button onClick={handleClearAllFilter}>Clear All</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}

          <Grid container item spacing={1}>
            {/* Filter Data list */}
            <Grid container item className="mx-2">
              <Grid item xs={12}>
                {isArray(jobsData) ? (
                  <SearchFilterData data={jobsData} />
                ) : (
                  <>
                    <span className="fs-2">No Current Openings</span>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SearchFilterLayout;
