import { useSelector } from "react-redux";
import { getSelectedCrewFromState } from "../../redux/selectors";

const SelectedCrew: React.FC = () => {
  const selectedCrew = useSelector(getSelectedCrewFromState);

  const message = <p>Здесь будет ваш экипаж</p>;

  return (
    <div className="selected-crew">
      {selectedCrew === null ? (
        message
      ) : (
        <>
          <img src="" alt="" />
          <div>
            <span>
              {selectedCrew.car_mark} {selectedCrew.car_model}
            </span>
            <span>{selectedCrew.car_color}</span>
          </div>
          <span>{selectedCrew.car_number}</span>
        </>
      )}
    </div>
  );
};

export default SelectedCrew;
