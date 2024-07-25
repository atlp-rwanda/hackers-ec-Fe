import { FC, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyType } from '../../@types/userType';
import { FaRegCopy } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

const CopyButton: FC<CopyType> = ({ name, text, value }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const interval = setTimeout(() => {
			setCopied(false);
		}, 3000);

		return () => clearTimeout(interval);
	}, [copied]);

	return (
		<CopyToClipboard
			text={value}
			onCopy={() => name === text && setCopied(true)}
		>
			<div className="flex ipad:gap-5 items-center pl-4 pr-1 py-1 border rounded justify-between ">
				<span className="text-[9px] ipad:text-xs">
					{copied ? 'Copied' : name}
				</span>
				<button
					disabled={copied}
					className={`p-1 border rounded hover:bg-slate-200 ${copied && 'bg-action-success hover:bg-action-success'} transition-colors`}
				>
					{copied ? <TiTick size={24} fill="white" /> : <FaRegCopy size={24} />}
				</button>
			</div>
		</CopyToClipboard>
	);
};

export default CopyButton;
