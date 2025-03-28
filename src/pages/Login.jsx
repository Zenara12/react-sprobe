import { Link } from 'react-router-dom';

const onSubmit = (ev) => {
	ev.preventDefault();
};

const Login = () => {
	return (
		<div className='login-signup-form animated fadeInDown'>
			<div className='form'>
				<form onSubmit={onSubmit}>
					<h1 className='title'>Login into your account</h1>

					<input type='email' placeholder='Email' />
					<input type='password' placeholder='Password' />
					<button className='btn btn-block'>Login</button>
					<p className='message'>
						Not registered? <Link to='/signup'>Create an account</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
