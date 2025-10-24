import Image from "next/image";

export default function Home() {
  return (
    <div className="">

      {/* Main */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-24 p-4">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EECS 4413</h1>
          <p className="text-lg">
            This is the home page of the EECS 4413 course website.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] rounded-full gradient-bg">
            Get Started
          </button>
        </div>
        <div className="h-[600px] w-[600px] bg-zinc-900"></div>
      </section>

      <section className="max-w-7xl mx-auto my-38">
        <h2 className="text-3xl font-bold mb-4 text-lefts">CATEGORIES</h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-zinc-900 rounded-lg p-4 w-full aspect-square">
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
