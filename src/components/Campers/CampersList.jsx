import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import CampersCard from "../CampersCard/CampersCard";
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
} from "../../redux/selector";

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
    <div>
      <ul>
        {campers.map((camper, index) => (
          <li key={index}>
            <CampersCard camper={camper} />
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
      {status && <p>Loading...</p>}
      {error && <p>Error message: {error}</p>}
    </div>
  );
}
