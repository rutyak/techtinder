import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/ConnectEdge_bg.jpg";
import Reviews from "./Reviews";
import Footer from "./Footer";
import WelcomHeader from "./WelcomHeader";
import Herosection from "./Herosection";

function Welcome() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const userData = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      navigate("/dashboard");
    }
  }, []);

  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div
      data-testid="welcome-container"
      className="relative"
      style={backgroundStyles}
    >
      <WelcomHeader
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      <Herosection
        isScrollingUp={isScrollingUp}
        setIsScrollingUp={setIsScrollingUp}
      />

      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 py-10">
        <Reviews />
        <Footer />
      </div>
    </div>
  );
}

export default Welcome;
