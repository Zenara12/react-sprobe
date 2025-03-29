import { createContext, useState, useContext } from 'react';

const StateContext = createContext({
	user: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
});

export const ContextProvider = ({ children }) => {
	const [user, _setUser] = useState(localStorage.getItem('user')|| '');
	const [token, _setToken] = useState(localStorage.getItem('token')||'');

	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem('token', String(token));
		}
	};

	const setUser = (user) => {
		_setUser(user.name);
		if (user) {
			localStorage.setItem('user', String(user.name));
		}
	};

	return (
		<StateContext.Provider value={{ user, token, setUser, setToken }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
