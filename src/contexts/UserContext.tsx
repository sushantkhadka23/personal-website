import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UserState {
    isLoggedIn: boolean;
}

interface UserAction {
    type: 'LOGIN' | 'LOGOUT';
}

function reducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case 'LOGIN':
            return { isLoggedIn: true };
        case 'LOGOUT':
            return { isLoggedIn: false };
        default:
            return state;
    }
}

const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { isLoggedIn: false });

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
