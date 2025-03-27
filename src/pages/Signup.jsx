import { Link } from 'react-router-dom';

export default function Signup() {

	const onSubmit = (ev) => {
		ev.preventDefault();

	};

	return (
		<div className='login-signup-form animated fadeInDown'>
			<div className='form'>
				<form onSubmit={onSubmit}>
					<h1 className='title'>Signup for Free</h1>
					{errors && (
						<div className='alert'>
							{Object.keys(errors).map((key) => (
								<p key={key}>{errors[key][0]}</p>
							))}
						</div>
					)}
					<input type='text' placeholder='Full Name' />
					<input type='email' placeholder='Email Address' />
					<input type='password' placeholder='Password' />
					<input
						ref={passwordConfirmationRef}
						type='password'
						placeholder='Repeat Password'
					/>
					<button className='btn btn-block'>Signup</button>
					<p className='message'>
						Already registered? <Link to='/login'>Sign In</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
