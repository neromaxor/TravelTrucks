import css from "./Filters.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../redux/operations";
import { selectFiltersCampers } from "../../redux/selector";
import { setFilters, toggleFilter, clearFilters } from "../../redux/slice";
import { useState } from "react";

export default function Filters() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { location: initialLocation, selectedFilters: initialFilters } = useSelector(selectFiltersCampers);

  const [localLocation, setLocalLocation] = useState(initialLocation || "");
  const [localFilters, setLocalFilters] = useState(initialFilters || []);

  const handleLocationChange = (e) => {
    setLocalLocation(e.target.value);
  };

  const handleFilterToggle = (filter) => {
    setLocalFilters((prevFilters) => {
      const index = prevFilters.indexOf(filter);
      if (index === -1) {
        return [...prevFilters, filter];
      } else {
        return prevFilters.filter((f) => f !== filter);
      }
    });
  };

  const handleSearch = () => {
    // Очищаємо попередні фільтри в Redux
    dispatch(clearFilters());

    // Застосовуємо нові фільтри
    dispatch(setFilters({ key: "location", value: localLocation }));
    localFilters.forEach((filter) => {
      dispatch(toggleFilter(filter));
    });

    const params = { location: localLocation };
    if (localFilters.length > 0) {
      params.filters = localFilters.join(",");
    }
    setSearchParams(params);
    dispatch(fetchFilters({ location: localLocation, selectedFilters: localFilters }));

    // Очищаємо локальний стан після пошуку
    setLocalFilters([]);
    setLocalLocation("");
  };

  return (
    <div className={css.container}>
      <div className={css.filter}>
        <input
          type="text"
          placeholder="Ukraine Kyiv"
          value={localLocation}
          onChange={handleLocationChange}
          className={css.inputLocation}
        />

        {/* Група для Vehicle equipment */}
        <div className={css.filterGroup}>
          <h2 className={css.sectionTitle}>Vehicle equipment</h2>
          <div className={css.filterItems}>
            {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map((filter) => (
              <div
                key={filter}
                className={`${css.filterItem} ${
                  localFilters.includes(filter.toLowerCase()) ? css.selected : ""
                }`}
                onClick={() => handleFilterToggle(filter.toLowerCase())}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        {/* Група для Vehicle type */}
        <div className={css.filterGroup}>
          <h2 className={css.sectionTitle}>Vehicle type</h2>
          <div className={css.filterItems}>
            {["van", "fullyIntegrated", "alcove"].map((filter) => (
              <div
                key={filter}
                className={`${css.filterItem} ${
                  localFilters.includes(filter) ? css.selected : ""
                }`}
                onClick={() => handleFilterToggle(filter)}
              >
                {filter === "van" ? "Van" : filter === "fullyIntegrated" ? "Fully Integrated" : "Alcove"}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} className={css.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
}