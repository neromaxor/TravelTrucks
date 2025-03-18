import css from "./Filters.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFilters } from "../../redux/operations";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFiltersCampers } from "../../redux/selector";
import { selectFilters } from "../../redux/slice";

export default function Filters() {
  const dispatch = useDispatch(selectFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filters = useSelector(selectFiltersCampers);
  const { location } = filters;

  const toggelefilter = (key, value) => {
    dispatch(selectFilters({ key, value }));
  };

  const handleSearch = () => {
    // Оновлюємо параметри URL
    setSearchParams({ location });

    // Викликаємо action для фільтрації
    dispatch(fetchFilters({ location }));
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    dispatch(fetchFilters({ filter }));
  };

  return (
    <div className={css.container}>
      <div className={css.filter}>
        <input
          type="text"
          placeholder="Ukraine Kyiv"
          value={location}
          onChange={(e) => toggelefilter("location", e.target.value)}
          className={css.inputLocation}
        />

        {/* Група для Vehicle equipment */}
        <div className={css.filterGroup}>
          <h2 className={css.sectionTitle}>Vehicle equipment</h2>
          <div className={css.filterItems}>
            {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map((filter) => (
              <div
                key={filter}
                className={`${css.filterItem} ${selectedFilter === filter ? css.selected : ""}`}
                onClick={() => handleFilterClick(filter)}
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
            {["VAN", "Fully Integrated", "Alcove"].map((filter) => (
              <div
                key={filter}
                className={`${css.filterItem} ${selectedFilter === filter ? css.selected : ""}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
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