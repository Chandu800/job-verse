
const Hero = ({ title = "Land your Dream Job", subtitle = '"Discover the perfect opportunity that matches your skills and ambitions"'}) => {
  return (
    <section className="bg-indigo-700 py-20 ">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">{title}</h1>
        <p className="my-4 text-xl text-white">{subtitle}</p>
      </div>
    </section>
  )
}

export default Hero 