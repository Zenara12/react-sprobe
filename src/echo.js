import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Initialize Pusher globally
window.Pusher = Pusher;

// Get the authentication token using the same approach as your Axios instance
const getAuthToken = () => localStorage.getItem('token');

// Create Echo instance
const createEcho = () => {
	const token = getAuthToken();

	return new Echo({
		broadcaster: 'pusher',
		key: import.meta.env.VITE_REVERB_KEY || 'app-key',
		wsHost: import.meta.env.VITE_REVERB_HOST || '127.0.0.1',
		wsPort: parseInt(import.meta.env.VITE_REVERB_PORT || '8081'),
		forceTLS: import.meta.env.VITE_REVERB_FORCE_TLS === 'true',
		disableStats: true,
		enabledTransports: ['ws', 'wss'],
		auth: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token ? `Bearer ${token}` : '',
			},
		},
	});
};

let echoInstance = null;

// Get or create the Echo instance
const echo = () => {
	if (!echoInstance) {
		echoInstance = createEcho();
	}
	return echoInstance;
};

// Reset Echo instance (useful after login/logout)
const resetEcho = () => {
	if (echoInstance) {
		echoInstance.connector.pusher.disconnect();
	}
	echoInstance = createEcho();
	return echoInstance;
};

export { echo, resetEcho };
