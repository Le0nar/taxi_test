import { useSelector } from "react-redux";
import { getSelectedCrewFromState } from "../../redux/selectors";
import taxi from "../../images/taxi.png";
import "./selectedCrew.scss"

const SelectedCrew: React.FC = () => {
  const selectedCrew = useSelector(getSelectedCrewFromState);

  return (
    <div className="selected-crew">
      <p className="selected-crew__title">Подходящий экипаж:</p>
      <div className="selected-crew__wrapper">
        {selectedCrew === null ? (
          <p>Здесь будет ваш экипаж</p>
        ) : (
          <>
            <img className="selected-crew__wrapper__img" src={taxi} alt="taxi pmg" />
            <div className="selected-crew__wrapper__about-car">
              <span className="selected-crew__wrapper__model">
                {selectedCrew.car_mark + " " + selectedCrew.car_model}
              </span>
              <span className="selected-crew__wrapper__color">{selectedCrew.car_color}</span>
            </div>
            <span className="selected-crew__wrapper__number">{selectedCrew.car_number}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedCrew;
