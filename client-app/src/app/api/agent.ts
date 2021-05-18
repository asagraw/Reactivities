import { UserFormValues } from "./../models/user";
import { toast } from "react-toastify";
import { IActivity } from "./../models/activity";
import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { User } from "../models/user";
import { request } from "http";
import userStore from "../stores/userStore";
import { useContext } from "react";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  if (window.localStorage.getItem("jwt"))
    config.headers.Authorization = `Bearer ${window.localStorage.getItem(
      "jwt"
    )}`;
  return config;
});
axios.interceptors.response.use(undefined, (error) => {
  if (!error.response) {
    toast.error("Network error- Make sure API is running!");
  }
  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  } else if (
    status === 400 &&
    data.errors.hasOwnProperty("id") &&
    config.method === "get"
  ) {
    history.push("/notfound");
  } else if (status == 400 && data.errors) {
    const modalStateErrors = [];
    for (const key in data.errors) {
      if (data.errors[key]) {
        modalStateErrors.push(data.errors[key]);
      }
    }
    throw modalStateErrors.flat();
  } else if (status === 500) {
    toast.error("Server Error: Check the terminal for more info!");
  }
});

const responseBody = (response: AxiosResponse) => {
  console.log(response);
  return response.data;
};

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string, body: {}) =>
    axios.delete(url, body).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string, activity: IActivity) =>
    requests.del(`/activities/${id}`, { data: activity }),
};

const Account = {
  current: (): Promise<User> => requests.get("/account"),
  login: (user: UserFormValues): Promise<User> =>
    requests.post("/account/login", user),
  register: (user: UserFormValues): Promise<User> =>
    requests.post("/account/register", user),
};

export default {
  Activities,
  Account,
};
