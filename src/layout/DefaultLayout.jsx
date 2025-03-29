import {
	Link,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useStateContext } from '../context/ContentProvider.jsx';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import {
	Bars3Icon,
	XMarkIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';
import axiosClient from '../axios.js';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Tasks', href: '/tasks' },
	{ name: 'Products', href: '/products' },
	{ name: 'Users', href: '/users' },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const DefaultLayout = () => {
	const { user, token, setToken, setUser } = useStateContext();
	const navigate = useNavigate();

	if (!token) {
		return <Navigate to='/login' />;
	}

	const currentRoute = useLocation();

	const pageName = navigation.find(
		(item) => item.href === currentRoute.pathname
	);

	function logout() {
		axiosClient
			.post('/api/logout')
			.then(({ data }) => {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				setToken(null);
				setUser(null);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.log(response);
				}
			});
	}
	return (
		<>
			<div className='min-h-full'>
				<Disclosure as='nav' className='bg-gray-800'>
					<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
						<div className='flex h-16 items-center justify-between'>
							<div className='flex items-center'>
								<div className='hidden md:block'>
									<div className='ml-10 flex items-baseline space-x-4'>
										{navigation.map((item) => {
											const isActive = currentRoute.pathname === item.href;
											return (
												<Link
													key={item.name}
													to={item.href}
													aria-current={item.current ? 'page' : undefined}
													className={classNames(
														isActive
															? 'bg-gray-900 text-white'
															: 'text-gray-300 hover:bg-gray-700 hover:text-white',
														'rounded-md px-3 py-2 text-sm font-medium'
													)}
												>
													{item.name}
												</Link>
											);
										})}
									</div>
								</div>
							</div>
							<div className='hidden md:block'>
								<div className='ml-4 flex items-center md:ml-6'>
									<Menu as='div' className='relative ml-3'>
										<div>
											{user && (
												<span className='text-white my-auto mx-10'>{user}</span>
											)}
											<MenuButton className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
												<span className='absolute -inset-1.5' />
												<span className='sr-only'>Open user menu</span>
												<ChevronDownIcon
													aria-hidden='true'
													className='size-6'
												/>
											</MenuButton>
										</div>
										<MenuItems
											transition
											className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
										>
											<MenuItem>
												<div
													onClick={logout}
													className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
												>
													Sign-out
												</div>
											</MenuItem>
										</MenuItems>
									</Menu>
								</div>
							</div>
							<div className='-mr-2 flex md:hidden'>
								{user && (
									<span className='text-white my-auto mx-5'>{user}</span>
								)}
								{/* Mobile menu button */}
								<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>Open main menu</span>
									<Bars3Icon
										aria-hidden='true'
										className='block size-6 group-data-[open]:hidden'
									/>
									<XMarkIcon
										aria-hidden='true'
										className='hidden size-6 group-data-[open]:block'
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className='md:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
							{navigation.map((item) => {
								const isActive = currentRoute.pathname === item.href;
								return (
									<DisclosureButton
										key={item.name}
										as='a'
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											isActive
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
									>
										{item.name}
									</DisclosureButton>
								);
							})}
						</div>
						<div className='border-t border-gray-700 pb-3 pt-4'>
							<div className='mt-3 space-y-1 px-2'>
								<DisclosureButton
									as='div'
									onClick={logout}
									className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
								>
									Sign-out
								</DisclosureButton>
							</div>
						</div>
					</DisclosurePanel>
				</Disclosure>
				<header className='bg-white shadow'>
					<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
						<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
							{pageName ? (
								pageName.name
							) : (
								<button
									onClick={() => navigate(-1)}
									className='flex flex-row items-center'
								>
									<ArrowLeftIcon className='size-6' />
									Back
								</button>
							)}
						</h1>
					</div>
				</header>
				<Outlet />
			</div>
		</>
	);
};

export default DefaultLayout;
