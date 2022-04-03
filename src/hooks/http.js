import { useReducer, useCallback } from "react";
import axios from "axios";

const initialState = {
  data: null,
  error: null,
  loading: false,
  reqBody: null,
  reqMethod: null,
};

const httpReducer = (currState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
        loading: true,
        reqBody: null,
        reqMethod: null,
      };
    case "RESPONSE":
      return {
        ...currState,
        loading: false,
        data: action.data,
        reqBody: action.reqBody,
        reqMethod: action.reqMethod,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.error,
      };
    case "CLEAR":
      return initialState;
    default:
      return;
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const sendRequest = useCallback((url, queryParams, method, body) => {
    dispatch({ type: "SEND" });
    const token = localStorage.getItem("token");
    const auth =`?auth=${token}`;
    axios({
      url: process.env.REACT_APP_BASE_URL + url + auth + '&' + queryParams,
      method: method,
      data: body,
    })
      .then((response) => {
        dispatch({
          type: "RESPONSE",
          data: response.data,
          reqBody: {...body},
          reqMethod: method,
        });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", data: error.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    reqBody: httpState.reqBody,
    reqMethod: httpState.reqMethod,
    sendRequest: sendRequest,
    clear: clear,
  };
};

export default useHttp;
