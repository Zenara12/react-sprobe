import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContentProvider';

const GuestLayout = () => {
	const { token } = useStateContext();
	if (token) {
		return <Navigate to='/' />;
	}
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<Outlet />
		</div>
	);
};

export default GuestLayout;
