import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          {" "}
          AI Powered Prompts{" "}
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an AI powered tool that gives and shares AI prompts for
        the modern world, helping people generate ideas and content with the
        latest artificial intelligence.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
