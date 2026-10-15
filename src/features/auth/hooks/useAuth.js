import {authService} from '../services/authService';
import {useEffect, useState} from 'react';



function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        setIsAuthenticated(!!accessToken);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            const accessToken = response.data?.body?.accessToken;

            if (!accessToken) {
                throw new Error(response.data?.message || 'The server did not return an access token.');
            }

            sessionStorage.setItem('accessToken', accessToken);
            setIsAuthenticated(true);
            return { success: true, message: 'Signed in successfully.' };
        } catch (error) {
            const message = error?.response?.data?.message
                || (error?.request ? 'Could not connect to the server. Please try again.' : error?.message);
            return { success: false, message };
        }
    };

    return { isAuthenticated, login };
}

export default useAuth;