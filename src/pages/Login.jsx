import { Link } from 'react-router-dom';
import { createRef, useState } from 'react';
import axiosClient from '../axios.js';
import { useStateContext } from '../context/ContentProvider';

const Login = () => {
	const emailRef = createRef();
	const passwordRef = createRef();
	const { setUser, setToken } = useStateContext();
	const [errors, setErrors] = useState(null);
	const [errorsCredentials, _setErrors] = useState(null);

	const onSubmit = (ev) => {
		ev.preventDefault();

		const payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		axiosClient
			.post('/api/login', payload)
			.then(({ data }) => {
				setUser(data.user);
				setToken(data.token);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
				if (response && response.status === 404) {
					_setErrors(response.data.message);
				}
			});
	};

	return (
		<>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
				{errors && (
					<div className='mt-5 text-start text-sm/6 text-red-500'>
						{Object.keys(errors).map((key) => (
							<p key={key}>{errors[key][0]}</p>
						))}
					</div>
				)}
				{errorsCredentials && (
					<div className='mt-5 text-start text-sm/6 text-red-500'>
						<p>{errorsCredentials}</p>
					</div>
				)}
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={onSubmit}>
					<div>
						<label
							htmlFor='email'
							className='block text-sm/6 font-medium text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								ref={emailRef}
								id='email'
								name='email'
								type='email'
								required
								autoComplete='email'
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Password
							</label>
							{/* <div className='text-sm'>
								<a
									href='#'
									className='font-semibold text-indigo-600 hover:text-indigo-500'
								>
									Forgot password?
								</a>
							</div> */}
						</div>
						<div className='mt-2'>
							<input
								ref={passwordRef}
								id='password'
								name='password'
								type='password'
								required
								autoComplete='current-password'
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md mt-5 bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign in
						</button>
					</div>
				</form>

				<p className='mt-10 text-center text-sm/6 text-gray-500'>
					Not registered?{' '}
					<Link to='/signup' className='text-purple-600'>
						Create an account
					</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
