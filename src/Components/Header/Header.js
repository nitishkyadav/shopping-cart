import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import LoginButton from "./LoginButton";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const homeButtonHandler = (event) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <div>
      <header>
        <h1 onClick={homeButtonHandler}>React Cart</h1>
        <div className={styles.buttons}>
          <HeaderCartButton />
          <LoginButton />
        </div>
      </header>
    </div>
  );
};

export default Header;
