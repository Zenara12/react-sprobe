import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios';
import { createRef, useEffect, useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Modal from '../components/Modal';
import Notif from '../components/Notif';

function ShowTask() {
	//state
	const routeParams = useParams();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [showNotif, setShowNotif] = useState(false);
	const [notifMessage, setNotifMessage] = useState('');
	const [errors, setErrors] = useState(null);
	const [task, setTask] = useState({
		title: '',
		body: '',
	});

	const titleRef = createRef();
	const bodyRef = createRef();

	const [openAlert, setopenAlert] = useState(false);
	const [taskId, setTaskId] = useState(routeParams.id);

	// methods
	function getTask() {
		axiosClient
			.get(`/api/tasks/${taskId}`)
			.then(({ data }) => {
				setTask(data);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	}

	function updateTask() {
		const payload = {
			title: titleRef.current.value,
			body: bodyRef.current.value,
		};

		axiosClient
			.put(`/api/tasks/${taskId}`, payload)
			.then(({ data }) => {
				setIsOpen(false);
				setNotifMessage(data.message);
				setShowNotif(true);
				setTask(data.task);
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
					console.log(response.data.errors);
				}
			});
	}

	useEffect(() => {
		getTask();
	}, []);
	return (
		<>
			{/* {show task notification activity} */}
			{showNotif && (
				<Notif message={notifMessage} onClose={() => setShowNotif(false)} />
			)}

			{task ? (
				<div className='w-full md:w-3/4 p-4 bg-slate-200 items-center mx-auto'>
					<div className='size-6 flex justify-end w-full mt-5'>
						<PencilSquareIcon
							className='text-orange-500 mx-5'
							onClick={() => {
								setIsOpen(true);
							}}
						/>
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

			{/* {Add Task Modal} */}
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={'Update Task'}
				actionButtons={
					<>
						<button
							type='button'
							onClick={updateTask}
							className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
						>
							Update
						</button>
						<button
							type='button'
							data-autofocus
							onClick={() => setIsOpen(false)}
							className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
						>
							Cancel
						</button>
					</>
				}
			>
				<div className='sm:m-auto sm:w-full min-w-96'>
					<form>
						{errors && (
							<div className='mt-5 text-start text-sm/6 text-red-500'>
								{Object.keys(errors).map((key) => (
									<p key={key}>{errors[key][0]}</p>
								))}
							</div>
						)}

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='title'
									className='block text-sm/6 font-medium text-gray-900'
								>
									Title
								</label>
							</div>
							<div className='mt-2'>
								<input
									defaultValue={task.title}
									ref={titleRef}
									id='title'
									name='title'
									type='text'
									required
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='body'
									className='block text-sm/6 font-medium text-gray-900'
								>
									Body
								</label>
							</div>
							<div className='mt-2'>
								<textarea
									defaultValue={task.body}
									ref={bodyRef}
									id='body'
									name='body'
									type='text'
									required
									className='block w-full min-h-28 max-h-80 overflow-y-auto resize-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>
					</form>
				</div>
			</Modal>

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
