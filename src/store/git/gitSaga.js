import { call, put, takeLatest } from 'redux-saga/effects';
import { onGitDataSuccess } from './gitSlice';

// For fetch the all git repos
function* getGitRepos({ payload }) {
  try {
    const response = yield call(() =>
      fetch(
        `https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${payload}`
      )
    );
    const data = yield response.json();
    yield put(onGitDataSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

function* gitSaga() {
  yield takeLatest('git/onGitDataStart', getGitRepos);
}

export default gitSaga;
