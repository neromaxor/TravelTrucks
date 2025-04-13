import css from "./CampersCard.module.css";
import PropTypes from "prop-types";
import { selectFiltersCampers } from "../../redux/selector";
import { useSelector } from "react-redux";
import sprite from "../../assets/icons/sprite.svg";
import CamperDetails from "./../../pages/CamperDetails";
import { useNavigate } from "react-router-dom";


export default function CampersCard({ camper }) {
  const characteristics = useSelector(selectFiltersCampers);
  const navigate = useNavigate()
  const handleDetalisClick =( ) =>{
    navigate("/details")
  }

  // Масив характеристик для перевірки
  const camperCharacteristics = [
    { key: "AC", label: "AC" },
    { key: "bathroom", label: "Bathroom" },
    { key: "kitchen", label: "Kitchen" },
    { key: "TV", label: "TV" },
    { key: "radio", label: "Radio" },
    { key: "refrigerator", label: "Refrigerator" },
    { key: "microwave", label: "Microwave" },
    { key: "gas", label: "Gas" },
    { key: "water", label: "Water" },
  ];

  return (
    <div className={css.container_campers_card}>
      <div className={css.image_container}>
        <img
          src={camper.gallery?.[0]?.original || "default-image.jpg"}
          alt={camper.name || "Camper"}
        />
      </div>
      <svg width={20} height={20} fill="red" stroke="red">
        <use href={`${sprite}#favorite_icons`} />
      </svg>
      <div className={css.description_container}>
        <h2>{camper.name}</h2>
        <h2>€{camper.price}.00</h2>
        <p>
          {camper.rating} ({camper.reviews.length} reviews)
        </p>
        <p>{camper.location || "Location not specified"}</p>
        <p>{camper.description || "No description available"}</p>
        <div className={css.properties}>
          <p>
            {camper.transmission.charAt(0).toUpperCase() +
              camper.transmission.slice(1)}
          </p>
          <p>
            {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
          </p>
          {/* Відображення характеристик на основі значень з Redux */}
          {/* {camperCharacteristics.map(({ key, label }) =>
            camper[key] === characteristics[key] ? <p key={key}>{label}</p> : null
          )} */}
          {/* Відображення характеристик на основі значень з camper */}
           {camperCharacteristics.map(({ key, label }) =>
            camper[key] ? <p key={key}>{label}</p> : null
          )}
        </div>
        <button  className="css.details" onClick={handleDetalisClick}>Show More</button>
      </div>
    </div>
  );
}

CampersCard.propTypes = {
  camper: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        original: PropTypes.string.isRequired,
      })
    ).isRequired,
    transmission: PropTypes.string.isRequired,
    engine: PropTypes.string.isRequired,
    AC: PropTypes.bool.isRequired,
    bathroom: PropTypes.bool.isRequired,
    kitchen: PropTypes.bool.isRequired,
    TV: PropTypes.bool.isRequired,
    radio: PropTypes.bool.isRequired,
    refrigerator: PropTypes.bool.isRequired,
    microwave: PropTypes.bool.isRequired,
    gas: PropTypes.bool.isRequired,
    water: PropTypes.bool.isRequired,
  }).isRequired,
};
