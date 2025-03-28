import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const DefaultLayout = () => {
	const { user, token } = useStateContext();

	if (!token) {
		return <Navigate to='/login' />;
	}
	return (
		<div id='defaultLayout'>
			<aside>
				<Link to='/dashboard'>Dashboard</Link>
				<Link to='/users'>Users</Link>
			</aside>
			<div className='content'>
				<header>
					<div>Header</div>
					<div>{user.name}</div>
				</header>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DefaultLayout;
