import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { getSession } from "next-auth/react";

const axiosClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        //Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "multipart/form-data",
      };

  const client = axios.create({
    baseURL: "https://dog.ceo/api",//get from env export? Next?
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("ACCESS_TOKEN");//getSession or get cookie value?
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;