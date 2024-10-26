import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import CampersCard from "../CampersCard/CampersCard";
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
} from "../../redux/selector";

export default function CamptrsList() {
  const dispatch = useDispatch();
  const campersList = useSelector(selectCampersList);
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  if (status) {
    return <p>Loading campers...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="campers-list">
        <ul>
          {Array.isArray(campersList) && campersList.length > 0 ? (
            campersList.map((camper) => (
              <li key={camper.id}>
                <CampersCard camper={camper} />
              </li>
            ))
          ) : (
            <p>No campers available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
