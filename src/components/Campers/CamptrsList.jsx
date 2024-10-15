import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../redux/operations"; // Використовуємо функцію для отримання кемперів
import CampersCard from "./CampersCard"; // Імпортуємо компонент картки кемпера
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
} from "../../redux/selector";

const CamptrsList = () => {
  const dispatch = useDispatch();

  const campersList = useSelector(selectCampersList);
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);
  // Викликаємо fetchCampers при першому завантаженні компонента
  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading campers...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Available Campers</h1>
      <div className="campers-list">
        {campersList.map((camper) => (
          <CampersCard key={camper.id} camper={camper} />
        ))}
      </div>
    </div>
  );
};

export default CamptrsList;
