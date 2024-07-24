import { DynamicData } from '../../@types/DynamicData';

const ChatMessages = ({ index, message, id }: DynamicData) => {
	return (
		<div
			key={index}
			className={`msgs p-1 rounded-xl flex items-start gap-2 ${
				message.sender.id === id
					? 'text-white self-end'
					: 'text-black self-start'
			}`}
		>
			<div>
				<h1 className="font-bold text-xl">
					{message.sender.id !== id ? message.sender.firstName : null}
				</h1>
				<p
					className={`${message.sender.id === id ? `p-3 rounded-l-xl rounded-br-xl text-xl bg-[#266591] text-[#fff]` : `p-3 rounded-r-xl rounded-bl-xl text-xl bg-[#ccdae9] text-black`}`}
				>
					{message.message}
				</p>
			</div>
		</div>
	);
};

export default ChatMessages;
