import "./index.css";
import noPageFound from "../../assets/pageNotFound.svg";
import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
  const navigate = useNavigate();
  return (
    <div className="no-page-found">
      <img src={noPageFound} alt="No page found" />
      <h2>Page not found</h2>
      <button
        className="back-to-home-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back to home
      </button>
    </div>
  );
};

export default NoPageFound;
