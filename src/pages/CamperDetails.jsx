import css from "./CamperDetails.module.css";
import Karluk from "../../public/Images/karluk.jpg";

export default function CamperDetails() {
           
  const camperDetailscharacteristics = [{


    
  }] 

  return (
    <section className={css.camperDetails}>
      <div className={css.container}>
        <h1 className={css.camperDetailsTitle}>Camper Details</h1>
        <h2 className={css.Anny}>Карлик хуярлик</h2>
        <img src={Karluk} alt="Anny" className={css.karluk} />
      </div>
    </section>
  );
}