import { createSlice } from '@reduxjs/toolkit';

// Slice for fetch the data from gitHub api
const gitSlice = createSlice({
  name: 'git',
  initialState: {
    gitHubData: {},
    isLoading: true,
    isError: false,
  },
  reducers: {
    //For for loading state
    onGitDataStart: (state) => {
      state.isLoading = true;
    },

    // setting the data of github api  https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc
    onGitDataSuccess: (state, action) => {
      state.gitHubData = action.payload;
      state.isLoading = false;
    },

    //calling if github api fails
    onGitDataFailure: (state) => {
      state.isError = true;
    },
  },
});

export const { onGitDataFailure, onGitDataStart, onGitDataSuccess } =
  gitSlice.actions;
export default gitSlice.reducer;
