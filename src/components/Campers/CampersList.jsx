import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import CampersCard from "../CampersCard/CampersCard";
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
} from "../../redux/selector";
import css from "./../Campers/CampersList.module.css";
import  Filters from "../Filters/Filters"


export default function CapmersList() {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);
  const campers = useSelector(selectCampersList);

  useEffect(() => {
    dispatch(fetchCampers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    // Додаємо ком
    <div className={css.container}>
     
      <div className={css.container_cards}>
      <Filters />
        {campers.map((camper, index) => (
          <div className={css.card_top}>
          <div key={index} className={css.card}>
            <CampersCard camper={camper} />
          </div></div>
        ))}
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
