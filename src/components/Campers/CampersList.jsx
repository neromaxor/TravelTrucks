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
      <div className="campers-list">
        <ul>
          {campersList.map((camper) => (
            <li key={index}>
              <CampersCard key={camper.id} camper={camper} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CamptrsList;
