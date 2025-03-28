import { createContext, useState, useContext } from 'react';

const StateContext = createContext({
	user: null,
	token: '',
	setUser: () => {},
	setToken: () => {},
});

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({ name: '' });
	const [token, _setToken] = useState(localStorage.getItem('token')||'');

	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem('token', String(token));
		}
	};

	return (
		<StateContext.Provider value={{ user, token, setUser, setToken }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
