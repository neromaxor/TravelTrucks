import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, fetchFilters } from "../../redux/operations";
import CampersCard from "../CampersCard/CampersCard";
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
  selectFiltersCampers,
} from "../../redux/selector";
import css from "./../Campers/CampersList.module.css";
import Filters from "../Filters/Filters";

export default function CampersList() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);
  const campers = useSelector(selectCampersList);
  const { location, selectedFilters, isFiltered } = useSelector(selectFiltersCampers);

  useEffect(() => {
    if (isFiltered) {
      // Якщо фільтри застосовані, використовуємо fetchFilters
      dispatch(fetchFilters({ location, selectedFilters, page: currentPage }));
    } else {
      // Інакше завантажуємо всі кемпери
      dispatch(fetchCampers({ page: currentPage }));
    }
  }, [dispatch, currentPage, isFiltered, location, selectedFilters]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <div className={css.container_cards}>
        <Filters />
        {campers && campers.length > 0 ? (
          campers.map((camper) => (
            <div className={css.card_top} key={camper.id}>
              <div className={css.card}>
                <CampersCard camper={camper} />
              </div>
            </div>
          ))
        ) : (
          <p>No campers found.</p>
        )}
      </div>
      <div className={css.button_container}>
        <button onClick={handleLoadMore} className={css.load_more_button}>
          Load More
        </button>
      </div>
      {status && <p className={css.loading_text}>Loading...</p>}
      {error && <p className={css.error_text}>Error message: {error}</p>}
    </div>
  );
}