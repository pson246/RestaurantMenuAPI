import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {

    login: ({ username, password }) => {
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: () => Promise.resolve({
        id: 'user',
        fullName: 'Developer'
    }),
    getPermissions: () => Promise.resolve('')

};