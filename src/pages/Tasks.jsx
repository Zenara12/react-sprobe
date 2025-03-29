import { useState, createRef, useEffect } from 'react';
import Modal from '../components/Modal';
import { PlusIcon, TrashIcon, EyeIcon } from '@heroicons/react/16/solid';
import axiosClient from '../axios';
import Notif from '../components/Notif';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
	//states
	const [isOpen, setIsOpen] = useState(false);
	const [openAlert, setopenAlert] = useState(false);
	const [showNotif, setShowNotif] = useState(false);
	const [errors, setErrors] = useState(null);
	const [notifMessage, setNotifMessage] = useState('');
	const [tasks, setTasks] = useState([]);

	const [taskId, setTaskId] = useState(false);

	const titleRef = createRef();
	const bodyRef = createRef();

	const navigate = useNavigate();

	//methods
	function onSubmit() {
		const payload = {
			title: titleRef.current.value,
			body: bodyRef.current.value,
		};
		axiosClient
			.post('/api/tasks', payload)
			.then(({ data }) => {
				getTasks();
				setIsOpen(false);
				setNotifMessage(data.message);
				setShowNotif(true);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	}

	function getTasks() {
		axiosClient
			.get('/api/tasks')
			.then(({ data }) => {
				setTasks(data);
			})
			.catch((err) => {
				const response = err.response;
				if (response && response.status === 422) {
					setErrors(response.data.errors);
				}
			});
	}

	function deleteTask(taskId) {
		if (taskId) {
			axiosClient
				.delete(`/api/tasks/${taskId}`)
				.then(({ data }) => {
					getTasks();
					setopenAlert(false);
					setNotifMessage(data.message);
					setShowNotif(true);
				})
				.catch((err) => {
					const response = err.response;
					if (response && response.status === 422) {
						setErrors(response.data.errors);
					}
				});
		}
	}

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div className='m-5'>
			{/* {show task notification activity} */}
			{showNotif && (
				<Notif message={notifMessage} onClose={() => setShowNotif(false)} />
			)}

			{/* { Open add task modal} */}
			<PlusIcon
				onClick={() => setIsOpen(true)}
				className='size-10 bg-blue-500 text-white rounded-md hover:bg-blue-600'
			>
				Add Task
			</PlusIcon>

			<div className='flex flex-wrap gap-6 p-10 justify-center md:justify-start items-center md:items-start'>
				{tasks.length > 0
					? tasks.map((task) => {
							return (
								<Card key={task.id} item={task}>
									<EyeIcon
										onClick={() => navigate(`/task/${task.id}`)}
										className='text-orange-500 mx-5'
									/>
									<TrashIcon
										className='text-red-700'
										onClick={() => {
											setopenAlert(true);
											setTaskId(task.id);
										}}
									/>
								</Card>
							);
					  })
					: 'No Tasks Found'}
			</div>

			{/* {Add Task Modal} */}
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={'Add Task'}
				actionButtons={
					<>
						<button
							type='button'
							onClick={onSubmit}
							className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto'
						>
							Save
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
		</div>
	);
};

export default Tasks;
