import DefaultLayout from '../layout/DefaultLayout';
import GuestLayout from '../layout/GuestLayout';
import Login from '../pages/Login';
import NotFound404 from '../pages/NotFound404';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import { Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import ShowTask from '../pages/ShowTask';

const routes = [
	{
		path: '/',
		element: <DefaultLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/dashboard' />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/tasks',
				element: <Tasks />,
			},
			{
				path: '/task/:id',
				element: <ShowTask />,
			},
		],
	},
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/',
				element: <Navigate to='/login' />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
		],
	},

	{
		path: '*',
		element: <NotFound404 />,
	},
];

export default routes;
