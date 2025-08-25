# Hiring Test

Welcome to Oliasoft's developer hiring coding challenge.

# Instructions

We've prepared a skeleton repository with everything needed to run the test app:

- React
- A GUI Component Library
- Redux, Redux Toolkit, and an API middleware
- Build toolchain (Babel+Webpack)
- Backend framework (Express)
- Test framework (Jest)

## Setup

- clone or download the repository: [gitlab.com/oliasoft-open-source/hiring-test](https://gitlab.com/oliasoft-open-source/hiring-test)

```
yarn install
```
## Running and Testing the code

In order to run the client do:

```
yarn run client
```

Similar for server:

```
yarn run server
```

To run unit tests:

```
yarn run test
```

## Challenge tasks

### Frontend challenge

You're given a list of oil sites and oil rigs available from our local database (server). Each site consist of multiple oil rigs used, which you can check.

The main endpoints are already there, and you can simply test it by clicking `Load Sites` or `Load Oil Rigs' buttons.

##### TODO 

- in `Main View`, expand the Sites and Oil rigs details
- `Main View` should consist of only Sites list, whereas list of Oil rigs should be moved to other view
- You should be able to sort Sites and Oil rigs lists by name
- Each Site in `Main View` should consist of:
    - name
    - country name
    - list of oil rigs used
- Clicking on the site of interest (button / link from previous point) should result in navigating to `Details Page`
- You should be able to navigate back to `Main View` from `Details Page`
- `Detailed Page` of each oil site should consist of:
    - name
    - country name
    - `Detailed Oil Rigs List` 
- Use loading indicators whenever appropriate
- Create `Chart View`
- You should be able to navigate back to `Main View` from `Chart View`
- Pick any charting library of your choice and plot the Sites on Bar or Line chart
    - Y axis should be the amount of oil rigs used for the site
    - X axis should be the name of the site


### Fullstack challenge

Extend the application to add new endpoints for:

- Fetching one specific site
  - by name
  - by id
- Fetching one specific oil rig
  - by name
  - by id
- Provide methods to add, modify and delete a site
- Provide methods to add, modify and delete an oil rig
- Add a new API route for statistics and add methods to get
  - number of sites 
  - number of oil rigs 
  - number of norwegian-based oil sites
  - number of norwegian-based oil rigs 
  - number of sites per character in the alphabet - histogram

## Tips

- use modern JavaScript (ES6+)
- use modern React approach
- use some state management functionality (either built-in within React or other)
- re-use GUI components from our [UI Library](https://gitlab.com/oliasoft-open-source/react-ui-library) (see the
 reference [Storybook](https://oliasoft-open-source.gitlab.io/react-ui-library/))
- use CSS modules for styling

## Submission

Submit your completed challenge by zipping it and emailing it to us (including the full git repo with history).
Don't push it back to the repository :)
