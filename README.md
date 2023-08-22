# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Task Details / Demo

### For Demo

Open [Demo](https://teknorix-react-task.vercel.app/) to test app.

### Task Details

#### Instructions

Complete the test, commit your code into a github repository and send us a link to the repository.
Max time for the test is 4 hours.
Use React JS with Hooks.
Use LESS or SASS for styling - optional.
Use a UI framework of your choice - optional.
Requirements
Teknorix wishes to build a ReactJS application to display their active job openings.

The application should show a list of all active job openings with search/filter functionality. Job opening details should be shown on a unique url.

#### Search

1. Search - Search box to search for jobs openings.
2. Department - Dropdown to show a list of all departments.
3. Location - Dropdown to show a list of all locations.
4. Function - Dropdown to show a list of all job functions.
5. Show applied filters with a X button to remove the filter.
6. Retain the applied filters on navigation to details page and back or refresh of page.
7. Use the lookups API to load the above.
8. Use server side filtering - applied filters must be passed to the api to load the list of jobs.

#### Detail

1. Implement details page as per the mockup above.
2. Apply button - navigate to the application form - url of this will be provided in the API response.
3. Other job openings - Show a list of job openings from the department of the current job opening.
4. Use the /api/v1/jobs/{id} API to load the details of the job opening.
5. **[Bonus]** Implement social share on Facebook, LinkedIn & Twitter.

## Other Deployments

Open [CyberMeals](https://cybermeals.vercel.app/) An Restraunt management App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
