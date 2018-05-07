const asyncActionType = type => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAIL: `${type}_FAIL`
});

//Prod Server
// export const MAIN_URL = "https://www....";

//Dev Server
// export const MAIN_URL = "https://dev.papajohns.com.tr/api/";

//Sample action type
// export const LOGIN = asyncActionType("LOGIN");
