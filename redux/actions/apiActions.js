import {
  MAIN_URL,
  GET_REAL_ESTATES,
  GET_PROJECTS,
  GET_AGGREMENTS,
  GET_DEBTS,
  GET_TRANSACTIONS,
  GET_SALES,
  GET_OFFERS,
  GET_PROJECTS_CLEAR,
  GET_VADESI_YAKLASANLAR,
  GET_SIKAYETLER,
  LOGIN,
  GET_CHARTS,
  SEND_CONTACT_FORM,
  GET_TAXES,
  GET_BORCLAR
} from "./actionTypes";
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import { encode as btoa } from "base-64";
import { AsyncStorage } from "react-native";

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    // Do something with response error

    return Promise.reject(error.response.data.detail);
  }
);

export const login = (username, password) => {
  return dispatch => {
    dispatch({ type: LOGIN.REQUEST, payload: { username, password } });
    axios
      .post(`${MAIN_URL}/api-auth/`, { username, password })
      .then(res => {
        debugger;
        const token = "Basic " + btoa(`${username}:${password}`);
        debugger;
        AsyncStorage.setItem("username", username);
        AsyncStorage.setItem("password", password);
        return dispatch({
          type: LOGIN.SUCCESS,
          payload: { token: token, data: res.data }
        });
      })
      .catch(err => {
        debugger;
        dispatch({ type: LOGIN.FAIL, payload: err });
      });
  };
};

export const getRealEstates = token => {
  return dispatch => {
    dispatch({ type: GET_REAL_ESTATES.REQUEST, payload: { token } });
    axios
      .get(`${MAIN_URL}/gayrimenkuller/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_REAL_ESTATES.SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({ type: GET_REAL_ESTATES.FAIL, payload: err });
      });
  };
};

export const getProjects = (username, password) => {
  const token = "Basic " + btoa(`${username}:${password}`);
  return dispatch => {
    dispatch({ type: GET_PROJECTS.REQUEST });
    axios
      .get(`${MAIN_URL}/projeler/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_PROJECTS.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_PROJECTS.FAIL, payload: err });
      });
  };
};

export const getSales = token => {
  return dispatch => {
    dispatch({ type: GET_SALES.REQUEST });
    axios
      .get(`${MAIN_URL}/gayrimenkuller/`, {
        params: {
          satilikkiralik: "satilik"
        },
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_SALES.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_SALES.FAIL, payload: err });
      });
  };
};

export const getAggrements = token => {
  return dispatch => {
    dispatch({ type: GET_AGGREMENTS.REQUEST });
    axios
      .get(`${MAIN_URL}/sozlesmeler/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_AGGREMENTS.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_AGGREMENTS.FAIL, payload: err });
      });
  };
};

export const getOffers = token => {
  return dispatch => {
    dispatch({ type: GET_OFFERS.REQUEST });
    axios
      .get(`${MAIN_URL}/teklifler/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_OFFERS.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_OFFERS.FAIL, payload: err });
      });
  };
};

export const getTransactions = token => {
  return dispatch => {
    dispatch({ type: GET_TRANSACTIONS.REQUEST });
    axios
      .get(`${MAIN_URL}/cari-hareketler/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_TRANSACTIONS.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_OGET_TRANSACTIONSFFERS.FAIL, payload: err });
      });
  };
};

export const getVadesiYaklasanlar = token => {
  return dispatch => {
    dispatch({ type: GET_VADESI_YAKLASANLAR.REQUEST });
    axios
      .get(`${MAIN_URL}/vadesi-yaklasanlar/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_VADESI_YAKLASANLAR.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_VADESI_YAKLASANLAR.FAIL, payload: err });
      });
  };
};

export const getSikayetler = token => {
  return dispatch => {
    dispatch({ type: GET_SIKAYETLER.REQUEST });
    axios
      .get(`${MAIN_URL}/sikayetoneri/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_SIKAYETLER.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_SIKAYETLER.FAIL, payload: err });
      });
  };
};

export const getCharts = token => {
  return dispatch => {
    dispatch({ type: GET_CHARTS.REQUEST });
    axios
      .get(`${MAIN_URL}/charts/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_CHARTS.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_CHARTS.FAIL, payload: err });
      });
  };
};

export const getTaxes = (startDate, endDate, token) => {
  return dispatch => {
    dispatch({
      type: GET_TAXES.REQUEST,
      payload: { startDate, endDate, token }
    });
    axios
      .get(`${MAIN_URL}/vergi-hesapla/`, {
        params: {
          baslangic: startDate,
          bitis: endDate
        },
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_TAXES.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_TAXES.FAIL, payload: err });
      });
  };
};

export const getBorclar = token => {
  return dispatch => {
    dispatch({
      type: GET_BORCLAR.REQUEST,
      payload: { token }
    });
    axios
      .get(`${MAIN_URL}/borclar/`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        return dispatch({
          type: GET_BORCLAR.SUCCESS,
          payload: { data: res.data, token: token }
        });
      })
      .catch(err => {
        dispatch({ type: GET_BORCLAR.FAIL, payload: err });
      });
  };
};

export const clearGetProjects = () => {
  return dispatch => {
    dispatch({ type: GET_PROJECTS_CLEAR });
  };
};
