import React from 'react';

interface IPayProps {
	handlePayment?: () => void;
	bgColor: string;
	icon: React.ReactNode;
	title: string;
	iconSize?: string;
	disable?: boolean;
}

function PaymentButton(payProps: IPayProps) {
	return (
		<button
			type="button"
			onClick={payProps.handlePayment}
			disabled={payProps.disable ? payProps.disable : false}
			className={`${payProps.bgColor} w-[80%] tablet:w-[50%] border border-neutral-grey hover:bg-opacity-80 button-size rounded-3xl flex items-center justify-center gap-3 py-`}
		>
			<img
				src={payProps.icon ? payProps.icon.toString() : ''}
				alt="stripe icon"
				className={
					payProps.iconSize ? payProps.iconSize : 'w-[1.5rem] tablet:w-[2rem]'
				}
			/>
			<div className="text-lg font-medium bg">{payProps.title}</div>
		</button>
	);
}

export default PaymentButton;
