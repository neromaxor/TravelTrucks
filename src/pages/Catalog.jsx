import CampersList from "../components/Campers/CampersList";
import css from "./../pages/Catalog.module.css";
export default function Catalog() {
  return (
    <div className={css.container}>
      <CampersList />
    </div>
  );
}
