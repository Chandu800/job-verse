import Hero from "../components/Hero"
import Homecards from "../components/Homecards"
import Joblistings from "../components/Joblistings"
import Alljobs from "../components/Alljobs"

const Homepage = () => {
  return (
    <>
      <Hero />
      <Homecards />
      <Joblistings isHome = {true} />
      <Alljobs />
    </>
  )
}

export default Homepage