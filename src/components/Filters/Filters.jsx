import css from "./Filters.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "../../redux/operations";
import { selectFiltersCampers } from "../../redux/selector";
import { setFilters, toggleFilter, clearFilters } from "../../redux/slice";
import { useState, useEffect } from "react";

export default function Filters() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { location: initialLocation, selectedFilters: initialFilters } = useSelector(selectFiltersCampers);

  const [localLocation, setLocalLocation] = useState(initialLocation || "");
  const [localFilters, setLocalFilters] = useState(initialFilters || []);

  // Стан для керування видимістю фільтрів
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsFiltersVisible(false); // приховуємо фільтри на мобілці
      } else {
        setIsFiltersVisible(true); // показуємо фільтри на великих екранах
      }
    };

    handleResize(); // Початкове налаштування
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleFilters = () => {
    setIsFiltersVisible((prev) => !prev);
  };

  const handleLocationChange = (e) => {
    setLocalLocation(e.target.value);
  };

  const handleFilterToggle = (filter) => {
    setLocalFilters((prevFilters) => {
      const index = prevFilters.indexOf(filter);
      return index === -1 ? [...prevFilters, filter] : prevFilters.filter((f) => f !== filter);
    });
  };

  const handleSearch = () => {
    dispatch(clearFilters());
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
    setLocalFilters([]);
    setLocalLocation("");
  };

  return (
    <>
      {window.innerWidth <= 768 && (
        <button onClick={handleToggleFilters} className={css.toggleButton}>
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </button>
      )}

      {isFiltersVisible && (
        <div className={css.container}>
          <div className={css.filter}>
            <input
              type="text"
              placeholder="Ukraine Kyiv"
              value={localLocation}
              onChange={handleLocationChange}
              className={css.inputLocation}
            />

            <div className={css.filterGroup}>
              <h2 className={css.sectionTitle}>Vehicle equipment</h2>
              <div className={css.filterItems}>
                {["AC", "Automatic", "Kitchen", "TV", "Bathroom"].map((filter) => (
                  <div
                    key={filter}
                    className={`${css.filterItem} ${localFilters.includes(filter.toLowerCase()) ? css.selected : ""}`}
                    onClick={() => handleFilterToggle(filter.toLowerCase())}
                  >
                    {filter}
                  </div>
                ))}
              </div>
            </div>

            <div className={css.filterGroup}>
              <h2 className={css.sectionTitle}>Vehicle type</h2>
              <div className={css.filterItems}>
                {["van", "fullyIntegrated", "alcove"].map((filter) => (
                  <div
                    key={filter}
                    className={`${css.filterItem} ${localFilters.includes(filter) ? css.selected : ""}`}
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
      )}
    </>
  );
}
