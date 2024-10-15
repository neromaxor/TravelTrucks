import css from "./CampersCard.module.css";

export default function CampersCard({ camper }) {
  return (
    <div className={css["camper-card"]}>
      <h2>{camper.name}</h2>
      <img src={camper.imageUrl} alt={camper.name} width="200" height="150" />
      <p>{camper.description}</p>
      <p>Price: ${camper.price}</p>
      {/* Інші поля, які доступні для кемпера */}
    </div>
  );
}
