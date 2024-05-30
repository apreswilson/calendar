import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate("/calendar/home");
  }
  return (
    <>
      <p>hi</p>
      <button onClick={navigateToPage}>Test</button>
    </>

  )
}

export default Home;