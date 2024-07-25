import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {

  auth: {
    // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID || process.env.VITE_MSAL_CLIENT_ID || "",
    // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
    authority: import.meta.env.VITE_MSAL_AUTHORITY || process.env.VITE_MSAL_AUTHORITY || "",
    // Full redirect URL, in form of http://localhost:8080/auth-callback
    redirectUri: `${import.meta.env.VITE_APP_BASE_URI}/auth-callback` || `${process.env.VITE_APP_BASE_URI}/auth-callback` || "",
    // We need to disable this feature because it is already handled by react-admin, and would otherwise conflict
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
  
};