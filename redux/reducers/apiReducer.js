import {
  GET_REAL_ESTATES,
  GET_PROJECTS,
  GET_PROJECTS_CLEAR,
  GET_SALES,
  GET_OFFERS,
  GET_TRANSACTIONS,
  GET_AGGREMENTS,
  GET_VADESI_YAKLASANLAR,
  GET_SIKAYETLER,
  LOGIN,
  GET_CHARTS,
  SEND_CONTACT_FORM,
  GET_TAXES,
  GET_BORCLAR
} from "../actions/actionTypes";
import cloneDeep from "lodash/cloneDeep";
import groupBy from "lodash/groupBy";

const INITIAL_STATE = {
  borclar: [],
  user: { name: "", last_name: "", email: "" },
  charts: {
    gayrimenkul_doluluk: 100,
    para_giris_cikis: [],
    toplam_depozito: []
  },
  projects: [],
  getSikayetlerAreLoading: false,
  getRealEstatesAreLoading: false,
  getProjectsAreLoading: false,
  getProjectsAreSuccess: false,
  getRealEstatesAreSuccess: false,
  projectsWithEstates: [],
  sales: [],
  transactions: [],
  vadesiYaklasanlar: [],
  loginIsLoading: false,
  loginIsSuccess: false,
  loginHasError: "",
  sikayetler: [],
  taxes: { data: {} }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REAL_ESTATES.REQUEST:
      return {
        ...state,
        getRealEstatesAreLoading: true,
        getRealEstatesAreSuccess: false,
        getRealEstatesHasError: ""
      };
    case GET_REAL_ESTATES.SUCCESS:
      const projects = cloneDeep(state.projects);
      const projectsWithEstates = [];

      action.payload.map(estate => {
        if (projectsWithEstates[estate.proje.id]) {
          projectsWithEstates[estate.proje.id].push(estate);
        } else {
          projectsWithEstates[estate.proje.id] = [estate];
        }
      });

      return {
        ...state,
        getRealEstatesAreLoading: false,
        getRealEstatesAreSuccess: true,
        realEstates: action.payload,
        projectsWithEstates: projectsWithEstates
      };
    case GET_REAL_ESTATES.FAIL:
      return {
        ...state,
        getRealEstatesAreLoading: false,
        getRealEstatesAreSuccess: false,
        getRealEstatesHasError: "Bir hata meydana geldi."
      };

    case GET_PROJECTS.REQUEST:
      return {
        ...state,
        getProjectsAreLoading: true,
        getProjectsAreSuccess: false,
        getProjectsHasError: undefined
      };
    case GET_PROJECTS.SUCCESS:
      return {
        ...state,
        getProjectsAreLoading: false,
        getProjectsAreSuccess: true,
        projects: action.payload.data,
        token: action.payload.token
      };
    case GET_PROJECTS.FAIL:
      return {
        ...state,
        getProjectsAreLoading: false,
        getProjectsAreSuccess: false,
        getProjectsHasError: action.payload
      };
    case GET_PROJECTS_CLEAR:
      return {
        ...state,
        getProjectsAreLoading: false,
        getProjectsAreSuccess: false,
        getProjectsHasError: undefined
      };

    case GET_SALES.REQUEST:
      return {
        ...state,
        getSalesAreLoading: true,
        getSalesAreSuccess: false,
        getSalesHasError: undefined
      };

    case GET_SALES.SUCCESS:
      return {
        ...state,
        getSalesAreLoading: false,
        getSalesAreSuccess: true,
        sales: action.payload.data
      };
    case GET_SALES.FAIL:
      return {
        ...state,
        getSalesAreLoading: false,
        getSalesAreSuccess: false,
        getSalesHasError: action.payload
      };

    case GET_OFFERS.REQUEST:
      return {
        ...state,
        getOffersAreLoading: true,
        getOffersAreSuccess: false,
        getOffersHasError: undefined
      };

    case GET_OFFERS.SUCCESS:
      return {
        ...state,
        getOffersAreLoading: false,
        getOffersAreSuccess: true,
        offers: action.payload.data
      };
    case GET_OFFERS.FAIL:
      return {
        ...state,
        getOffersAreLoading: false,
        getOffersAreSuccess: false,
        getOffersHasError: action.payload
      };

    case GET_TRANSACTIONS.REQUEST:
      return {
        ...state,
        getTransactionsAreLoading: true,
        getTransactionsAreSuccess: false,
        getTransactionsHasError: undefined
      };

    case GET_TRANSACTIONS.SUCCESS:
      return {
        ...state,
        getTransactionsAreLoading: false,
        getTransactionsAreSuccess: true,
        transactions: action.payload.data
      };
    case GET_TRANSACTIONS.FAIL:
      return {
        ...state,
        getTransactionsAreLoading: false,
        getTransactionsAreSuccess: false,
        getTransactionsHasError: action.payload
      };

    case GET_AGGREMENTS.REQUEST:
      return {
        ...state,
        getAggrementsAreLoading: true,
        getAggrementsAreSuccess: false,
        getAggrementsHasError: undefined
      };

    case GET_AGGREMENTS.SUCCESS:
      return {
        ...state,
        getAggrementsAreLoading: false,
        getAggrementsAreSuccess: true,
        aggrements: action.payload.data
      };
    case GET_AGGREMENTS.FAIL:
      return {
        ...state,
        getAggrementsAreLoading: false,
        getAggrementsAreSuccess: false,
        getAggrementsHasError: action.payload
      };

    case GET_VADESI_YAKLASANLAR.REQUEST:
      return {
        ...state,
        getVadesiYaklasanlarAreLoading: true,
        getVadesiYaklasanlarAreSuccess: false,
        getVadesiYaklasanlarHasError: undefined
      };

    case GET_VADESI_YAKLASANLAR.SUCCESS:
      return {
        ...state,
        getVadesiYaklasanlarAreLoading: false,
        getVadesiYaklasanlarAreSuccess: true,
        vadesiYaklasanlar: action.payload.data
      };
    case GET_VADESI_YAKLASANLAR.FAIL:
      return {
        ...state,
        getVadesiYaklasanlarAreLoading: false,
        getVadesiYaklasanlarAreSuccess: false,
        getVadesiYaklasanlarHasError: action.payload
      };

    case LOGIN.REQUEST:
      return {
        ...state,
        loginIsLoading: true,
        loginIsSuccess: false,
        loginHasError: undefined
      };

    case LOGIN.SUCCESS:
      return {
        ...state,
        loginIsLoading: false,
        loginIsSuccess: true,
        loginHasError: "",
        token: action.payload.token,
        user: action.payload.data
      };
    case LOGIN.FAIL:
      return {
        ...state,
        loginIsLoading: false,
        loginIsSuccess: false,
        loginHasError: action.payload
      };

    case GET_SIKAYETLER.REQUEST:
      return {
        ...state,
        getSikayetlerAreLoading: true,
        getSikayetlerAreSuccess: false,
        getSikayetlerHasError: undefined
      };

    case GET_SIKAYETLER.SUCCESS:
      const group = groupBy(action.payload.data, value => {
        return `${value.proje.info} Kapı No: ${
          value.portfoyno._ozellikler.kapino
        }`;
      });

      const arrayGroup = [];

      Object.keys(group).map(key => {
        arrayGroup.push({ title: key, data: [...group[key]] });
      });

      debugger;

      debugger;
      return {
        ...state,
        getSikayetlerAreLoading: false,
        getSikayetlerAreSuccess: true,
        sikayetler: arrayGroup
      };
    case GET_SIKAYETLER.FAIL:
      return {
        ...state,
        getSikayetlerAreLoading: false,
        getSikayetlerAreSuccess: false,
        getSikayetlerHasError: action.payload
      };

    case GET_CHARTS.REQUEST:
      return {
        ...state,
        getChartsAreLoading: true,
        getChartsAreSuccess: false,
        getChartsHasError: undefined
      };

    case GET_CHARTS.SUCCESS:
      return {
        ...state,
        getChartsAreLoading: false,
        getChartsAreSuccess: true,
        charts: action.payload.data
      };
    case GET_CHARTS.FAIL:
      return {
        ...state,
        getChartsAreLoading: false,
        getChartsAreSuccess: false,
        getChartsHasError: action.payload
      };

    case SEND_CONTACT_FORM.REQUEST:
      return {
        ...state,
        sendFormIsLoading: true,
        sendFormIsSuccess: false,
        sendFormError: undefined
      };

    case SEND_CONTACT_FORM.SUCCESS:
      return {
        ...state,
        sendFormIsLoading: false,
        sendFormIsSuccess: true,
        sendFormError: undefined
      };
    case SEND_CONTACT_FORM.FAIL:
      return {
        ...state,
        sendFormIsLoading: false,
        sendFormIsSuccess: false,
        sendFormError: action.payload
      };

    case GET_TAXES.REQUEST:
      return {
        ...state,
        getTaxesAreLoading: true,
        getTaxesAreSuccess: false,
        getTaxesError: undefined
      };

    case GET_TAXES.SUCCESS:
      return {
        ...state,
        getTaxesAreLoading: false,
        getTaxesAreSuccess: true,
        getTaxesError: undefined,
        taxes: action.payload
      };
    case GET_TAXES.FAIL:
      return {
        ...state,
        getTaxesAreLoading: false,
        getTaxesAreSuccess: false,
        getTaxesError: action.payload
      };

    case GET_BORCLAR.REQUEST:
      return {
        ...state,
        getBorclarAreLoading: true,
        getBorclarAreSuccess: false,
        getBorclarError: undefined
      };

    case GET_BORCLAR.SUCCESS:
      return {
        ...state,
        getBorclarAreLoading: false,
        getBorclarAreSuccess: true,
        getBorclarError: undefined,
        borclar: action.payload.data
      };
    case GET_BORCLAR.FAIL:
      return {
        ...state,
        getBorclarAreLoading: false,
        getBorclarAreSuccess: false,
        getBorclarError: action.payload
      };

    default:
      return state;
  }
};
