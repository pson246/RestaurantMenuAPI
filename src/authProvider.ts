import { AuthProvider, fetchUtils } from "react-admin";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || process.env.VITE_REACT_APP_API_URL || "";
const SUCCESS = "success";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {        
        const response = await fetchUtils?.fetchJson(`${API_URL}/api/AuthenticateHttp`, {
            method: 'POST',            
            body: JSON.stringify({ username, password })
        });        
        if (response.json?.result !== SUCCESS) {
            return Promise?.reject();            
        }
        localStorage?.setItem('username', username);
        return Promise?.resolve();        
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage?.removeItem("username");
        return Promise?.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage?.removeItem("username");
            return Promise?.reject();
        }
        return Promise?.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage?.getItem("username")
            ? Promise?.resolve()
            : Promise?.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise?.resolve()
};