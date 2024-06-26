interface SideBoxProps {
	top?: string;
}

function UserProfileSideBox({ top }: SideBoxProps) {
	return (
		<div className="flex flex-col gap-3 w-[10rem] font-bold bg-neutral-white rounded shadow relative tablet:mb-auto">
			<span className={`absolute h-8 w-2 bg-primary-lightblue ${top}`}></span>
			<p className="text-primary-lightblue text-center cursor-pointer">
				Profile
			</p>
			<p className="text-center font-bold cursor-pointer">Password</p>
		</div>
	);
}

export default UserProfileSideBox;
