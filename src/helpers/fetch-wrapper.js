import axios from "axios";
import { getEndpoint } from "@helpers/util";

export const get = (...args) => {
  return axios
    .get(...args)
    .then((response) => response.data.data)
    .catch((e) => console.log("get error:", e));
};

export const getOne = (...args) => {
  return get(...args).then((data) => data[0] ?? null);
};

export const post = (...args) => {
  return axios
    .post(...args)
    .then((response) =>
      args[0] == `/api/v1/warranty/upload-image`
        ? response.data.result[0]
        : args[0] == `${getEndpoint()}/email-verification/template`
        ? response.data
        : response.data.data
    )
    .catch((e) => console.log("post error:", e));
};

export const put = (...args) => {
  return axios
    .put(...args)
    .then((response) => response.data.data)
    .catch((e) => console.log("put error:", e));
};
