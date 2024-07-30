import { msalAuthProvider } from "ra-auth-msal";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const myMSALObj = new PublicClientApplication(msalConfig);

await myMSALObj.initialize();

export const authProvider = msalAuthProvider({ msalInstance: myMSALObj });