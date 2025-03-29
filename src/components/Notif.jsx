import { useEffect } from 'react';

export default function Notif({ message, onClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000); // Auto-close after 3 seconds

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className='fixed bottom-7 right-7 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300'>
			{message}
		</div>
	);
}
