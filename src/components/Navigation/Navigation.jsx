import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"; // Приклад, якщо використовуєш CSS модулі
export default function Navigation() {
  return (
    <nav className={css.nav}>
      {" "}
      {/* Додай клас, якщо потрібно */}
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>{" "}
      {/* Вкажи правильні шляхи */}
      <NavLink to="/catalog" className={css.link}>
        Catalog
      </NavLink>
    </nav>
  );
}
