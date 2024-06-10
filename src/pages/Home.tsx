const Home = () => {
  return <div className="h-fit bg-image grid ipad:grid-cols-4 gap-2 px-4 tablet:grid-cols-3 grid-cols-1 bg-custom-gradient">
    {[...Array(8)].map((_, i) => <div key={i} className=" h-[15rem] w-[15rem] bg-action-success m-auto justify-center items-center text-center">Card{i}</div>)
    }
  </div>;
};

export default Home;
