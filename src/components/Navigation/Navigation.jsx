import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
export default function Navigation() {
  return (
    <nav className={css.nav}>
      <div className={css.container}>
        <span className={css.logo}>Travel</span>
        <span className={css.logoTrucks}>Trucks</span>
        <div className={css.links}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Catalog
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
