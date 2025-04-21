import { useReducer, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
};

// Create context
export const AuthContext = createContext(INITIAL_STATE);

// Reducer function
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { user: null, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return { user: action.payload, loading: false, error: null };
        case "LOGIN_FAILURE":
            return { user: null, loading: false, error: action.payload };
        case "LOGOUT":
            return { user: null, loading: false, error: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    let inactivityTimer;

    // Store user in AsyncStorage when state.user changes
    useEffect(() => {
        const storeUser = async () => {
            try {
                if (state.user) {
                    await AsyncStorage.setItem('user', JSON.stringify(state.user));
                    resetInactivityTimer();
                } else {
                    await AsyncStorage.removeItem('user');
                }
            } catch (e) {
                console.log('Error storing user:', e);
            }
        };
        storeUser();
    }, [state.user]);

    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedUser) });
                }
            } catch (error) {
                console.log('Error loading user:', error);
            }
        };
        loadUser();
    }, []);

    // Auto-logout after 5 minutes of inactivity
    const resetInactivityTimer = () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            dispatch({ type: "LOGOUT" });
        }, 25 * 60 * 10000); // 5 minutes
    };


    


    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
                resetInactivityTimer,  // Call this on user interactions
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
