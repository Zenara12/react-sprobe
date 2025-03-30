import { Link } from 'react-router-dom';
import { createRef, useState } from 'react';
import axiosClient from '../axios.js';
import { useStateContext } from '../context/ContentProvider';

export default function Signup() {
	const nameRef = createRef();
	const emailRef = createRef();
	const passwordRef = createRef();
	const passwordConfirmationRef = createRef();
	const { setUser, setToken } = useStateContext();
	const [errors, setErrors] = useState(null);

	const onSubmit = (ev) => {
		ev.preventDefault();

		const payload = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			password_confirmation: passwordConfirmationRef.current.value,
		};
		axiosClient
			.post('/api/signup', payload)
			.then(({ data }) => {
				setUser(data.user);
				setToken(data.token);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	};

	return (
		<div className='login-signup-form animated fadeInDown'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
					Sign up for free
				</h2>
				{errors && (
					<div className='mt-5 text-start text-sm/6 text-red-500'>
						{Object.keys(errors).map((key) => (
							<p key={key}>{errors[key][0]}</p>
						))}
					</div>
				)}
			</div>

			<div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={onSubmit}>
					<div>
						<label
							htmlFor='fullname'
							className='block text-sm/6 font-medium text-gray-900'
						>
							Fullname
						</label>
						<div className='mt-2'>
							<input
								ref={nameRef}
								id='fullname'
								name='fullname'
								type='text'
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							/>
						</div>
					</div>

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
						</div>
						<div className='mt-2'>
							<input
								ref={passwordRef}
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password_confirmation'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Repeat Password
							</label>
						</div>
						<div className='mt-2'>
							<input
								ref={passwordConfirmationRef}
								id='password_confirmation'
								name='password_confirmation'
								type='password'
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
					Already registered?{' '}
					<Link to='/login' className='text-purple-900'>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
