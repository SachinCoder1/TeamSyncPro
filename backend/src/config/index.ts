import { ENV } from "~/constants";

type Config = {
  BASE_URL: string;
  CLIENT_URL: string;
};

type ConfigEnv = {
  dev: Config;
  testing: Config;
  production: Config;
};

const config: ConfigEnv = {
  dev: {
    BASE_URL: "http://localhost:8000",
    CLIENT_URL: "http://localhost:3000",
  },
  testing: {
    BASE_URL: "",
    CLIENT_URL: "",
  },
  production: {
    BASE_URL: "http:coming:soon",
    CLIENT_URL: "http:coming:soon",
  },
};

const envConfig: Config = config[ENV];
export const BASE_URL = envConfig.BASE_URL;
export const CLIENT_URL = envConfig.CLIENT_URL;

export const API_VERSION = "v1";

export const DEFAULT_API_URL = `/api/${API_VERSION}`;
