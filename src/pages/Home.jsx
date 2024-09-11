import css from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleCatalogClick = () => {
    navigate("/catalog");
  };
  return (
    <section className={css.container}>
      <div>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
      </div>
      <button className={css.viewNow} onClick={handleCatalogClick}>
        View Now
      </button>
    </section>
  );
}
