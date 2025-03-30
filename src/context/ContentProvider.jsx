import { createContext, useState, useContext } from 'react';

const StateContext = createContext({
	user: null,
	token: null,
	userId: null,
	setUser: () => {},
	setToken: () => {},
	_setUserId: () => {},
});

export const ContextProvider = ({ children }) => {
	const [user, _setUser] = useState(localStorage.getItem('user') || '');
	const [userId, _setUserId] = useState(localStorage.getItem('userId') || null);
	const [token, _setToken] = useState(localStorage.getItem('token') || '');

	const setToken = (token) => {
		_setToken(token);
		if (token) {
			localStorage.setItem('token', String(token));
		}
	};

	const setUser = (user) => {
		_setUser(user.name);
		_setUserId(user.id);
		if (user) {
			localStorage.setItem('user', user.name);
			localStorage.setItem('userId', user.id);
		}
	};

	return (
		<StateContext.Provider value={{ user, token, userId, setUser, setToken }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
