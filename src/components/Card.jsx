function Card({ item }) {
	return (
		<>
			<div className='sm:mx-auto sm:w-full sm:min-w-sm md:max-w-sm bg-white p-6 rounded-lg shadow-md flex sm:items-center md:items-start'>
				<div>
					<h4 className='text-lg font-semibold'>{item.title}</h4>
					<p className='text-gray-500'>{item.body}</p>
					<p className='text-slate-700 mt-2 text-sm'>
						{new Date(item.created_at).toLocaleTimeString()}
					</p>
				</div>
			</div>
		</>
	);
}

export default Card;
