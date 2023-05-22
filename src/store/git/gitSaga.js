import { call, put, takeLatest } from 'redux-saga/effects';
import { onGitDataSuccess } from './gitSlice';

// For fetch the all git repos
function* getGitRepos({ payload }) {
  const date = payload.selectedDate.getDay();
  const month = payload.selectedDate.getMonth() + 1;
  const year = payload.selectedDate.getFullYear();
  let dd;
  let mm;

  if (date < 10) {
    dd = '0' + date;
  }
  if (month < 10) {
    mm = '0' + month;
  }

  try {
    const response = yield call(() =>
      fetch(
        `https://api.github.com/search/repositories?q=created:%3E${year}-${mm}-${dd}&sort=stars&order=desc&page=${payload.page}`
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
