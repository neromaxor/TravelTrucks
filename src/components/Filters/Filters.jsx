import css from "./Filters.module.css";


export default function Filters() {
  return (
    <div className={css.container}>
      <div className={css.filter_container}>
        <h2>Filters</h2>
        <div className={css.filter}>
          <label>
            <input type="checkbox" />
            AC
          </label>
          <label>
            <input type="checkbox" />
            Bathroom
          </label>
          <label>
            <input type="checkbox" />
            Kitchen
          </label>
          <label>
            <input type="checkbox" />
            TV
          </label>
          <label>
            <input type="checkbox" />
            Radio
          </label>
          <label>
            <input type="checkbox" />
            Refrigerator
          </label>
          <label>
            <input type="checkbox" />
            Microwave
          </label>
          <label>
            <input type="checkbox" />
            Gas
          </label>
          <label>
            <input type="checkbox" />
            Water
          </label>
        </div>
      </div>
    </div>
  );
}