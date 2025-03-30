function Card({ title, body, created_at, children }) {
	return (
		<>
			<div className='sm:mx-auto sm:w-full sm:min-w-sm md:max-w-sm bg-white p-6 rounded-lg shadow-md flex sm:items-center md:items-start'>
				<div>
					<h4 className='text-lg font-semibold break-words line-clamp-2'>
						{title}
					</h4>
					<p className='text-gray-500 break-all line-clamp-2'>{body}</p>
					<p className='text-slate-700 mt-2 text-sm'>
						{created_at ? new Date(created_at).toLocaleTimeString() : ''}
					</p>
				</div>
				<div className='size-6 flex justify-end w-full mt-auto'>{children}</div>
			</div>
		</>
	);
}

export default Card;
