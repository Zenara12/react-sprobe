import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios';
import { useEffect, useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Modal from '../components/Modal';

function ShowTask() {
	//state
	const routeParams = useParams();
	const navigate = useNavigate();

	const [errors, setErrors] = useState(null);
	const [task, setTask] = useState();

	const [openAlert, setopenAlert] = useState(false);
	const [taskId, setTaskId] = useState(routeParams.id);

	// methods
	function getTask() {
		axiosClient
			.get(`/api/tasks/${taskId}`)
			.then(({ data }) => {
				// console.log(data);
				setTask(data);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	}

	function deleteTask(taskId) {
		axiosClient
			.delete(`/api/tasks/${taskId}`)
			.then(({ data }) => {
				setopenAlert(false);
				navigate('/tasks');
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	}

	useEffect(() => {
		getTask();
	}, []);
	return (
		<>
			{errors && (
				<div className='mt-5 text-start text-sm/6 text-red-500'>
					{Object.keys(errors).map((key) => (
						<p key={key}>{errors[key][0]}</p>
					))}
				</div>
			)}

			{task ? (
				<div className='w-full md:w-3/4 p-4 bg-slate-200 items-center mx-auto'>
					<div className='size-6 flex justify-end w-full mt-5'>
						<PencilSquareIcon className='text-orange-500 mx-5' />
						<TrashIcon
							className='text-red-700 md:mr-48 mr-10'
							onClick={() => {
								setopenAlert(true);
								setTaskId(task.id);
							}}
						/>
					</div>
					<div className='p-4 w-full sm:max-w-md md:max-w-6xl mx-auto'>
						<b className='text-black font-bold text-lg break-words'>
							{task.title}
						</b>
						<p className='text-sm break-words'>{task.body}</p>
					</div>
				</div>
			) : (
				''
			)}

			{/* Alert Modal */}
			<Modal
				isOpen={openAlert}
				onClose={() => setopenAlert(false)}
				title={'Are you sure?'}
				actionButtons={
					<>
						<button
							type='button'
							onClick={() => {
								deleteTask(taskId);
							}}
							className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
						>
							Delete
						</button>
						<button
							type='button'
							data-autofocus
							onClick={() => {
								setopenAlert(false);
								setTaskId(null);
							}}
							className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
						>
							Cancel
						</button>
					</>
				}
			></Modal>
		</>
	);
}

export default ShowTask;
