import { createContext, useContext } from "react";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "./../models/user";
import { history } from "../..";
import { store } from "./store";

class UserStore {
  user: User | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  get isLoggedIn() {
    return !!this.user;
  }

  setToken = (token: string | null) => {
    // if (token) window.localStorage.setItem("jwt", token);
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      this.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    this.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      this.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}

export default createContext(new UserStore());
