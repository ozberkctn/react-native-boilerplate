const asyncActionType = type => ({
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAIL: `${type}_FAIL`
});

//Prod Server
export const MAIN_URL = "https://online.keystoneyonetim.com/tr/api/v2";

//Dev Server
// export const MAIN_URL = "https://online.keystoneyonetim.com/tr/api/v2";

//Sample action type
export const GET_REAL_ESTATES = asyncActionType("GET_REAL_ESTATES");
export const GET_PROJECTS = asyncActionType("GET_PROJECTS");
export const GET_AGGREMENTS = asyncActionType("GET_AGGREMENTS");
export const GET_DEBTS = asyncActionType("GET_DEBTS");
export const GET_TRANSACTIONS = asyncActionType("GET_TRANSACTIONS");
export const GET_SALES = asyncActionType("GET_SALES");
export const GET_OFFERS = asyncActionType("GET_OFFERS");
export const GET_VADESI_YAKLASANLAR = asyncActionType("GET_VADESI_YAKLASANLAR");
export const GET_SIKAYETLER = asyncActionType("GET_SIKAYETLER");
export const GET_CHARTS = asyncActionType("GET_CHARTS");
export const SEND_CONTACT_FORM = asyncActionType("SEND_CONTACT_FORM");
export const GET_TAXES = asyncActionType("GET_TAXES");
export const GET_BORCLAR = asyncActionType("GET_BORCLAR");

export const LOGIN = asyncActionType("LOGIN");

export const GET_PROJECTS_CLEAR = "GET_PROJECTS_CLEAR";
