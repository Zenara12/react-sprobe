import { useEffect, useState } from 'react';
import axiosClient from '../axios';
import Card from '../components/Card';

export default function Dashboard() {
	const [tasksCount, setTasksCount] = useState(0);

	function getTasks() {
		axiosClient
			.get('/api/tasks')
			.then(({ data }) => {
				setTasksCount(data.length);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					console.error(response);
				}
			});
	}

	useEffect(() => {
		getTasks();
	}, [tasksCount]);

	return (
		<>
			<div className='mt-10 mx-2 md:mx-auto'>
				<Card title={'Tasks'} body={`#${tasksCount}`} />
			</div>
		</>
	);
}
