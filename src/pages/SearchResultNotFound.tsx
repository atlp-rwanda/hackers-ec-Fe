const SearchResultNotFound = () => {
	return (
		<div className="w-full h-64 flex items-center justify-center">
			<div className=" text-primary-lightblue">
				<h1 className="text-xl text-center">No results found</h1>
				<p>It seems we can not find any results based on your search.</p>
			</div>
		</div>
	);
};

export default SearchResultNotFound;
