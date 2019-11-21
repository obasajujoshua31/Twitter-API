import iConfig from "app/config/iconfig";

export default interface iJwt {
  id: string;
  config: iConfig;
}

export interface iDecode {
  token: string;
  config: iConfig;
}
