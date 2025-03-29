function Card({ item, children }) {
	return (
		<>
			<div className='sm:mx-auto sm:w-full sm:min-w-sm md:max-w-sm bg-white p-6 rounded-lg shadow-md flex sm:items-center md:items-start'>
				<div>
					<h4 className='text-lg font-semibold break-all line-clamp-2'>
						{item.title}
					</h4>
					<p className='text-gray-500 break-all line-clamp-2'>{item.body}</p>
					<p className='text-slate-700 mt-2 text-sm'>
						{new Date(item.created_at).toLocaleTimeString()}
					</p>
				</div>
				<div className='size-6 flex justify-end w-full mt-auto'>{children}</div>
			</div>
		</>
	);
}

export default Card;
