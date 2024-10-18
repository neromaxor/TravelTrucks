import css from "./CampersCard.module.css";
import PropTypes from "prop-types";

export default function CampersCard({ camper }) {
  return (
    <div className={css.container_campers_card}>
      <div className={css.image_container}>
        <img src={camper.gallery[0].original} alt={camper.name} />
      </div>
      <div className={css.description_container}>
        <h2>{camper.name}</h2>
        <h2>€{camper.price}</h2>
        <p>
          {camper.rating} ({camper.reviews.length} reviews)
        </p>
        <p>{camper.location}</p>
        <p>{camper.description}</p>
        <button>Show More</button>
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
  }).isRequired,
};
