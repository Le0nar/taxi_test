import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ICrew } from "../../interfaces";
import {
  changeSelectedCrewToEmpty,
  changeSelectedCrewToValue,
} from "../../redux/selectedCrew/selectedCrewActions";
import "./crewsWrapper.scss";
import taxi from "../../images/taxi.png";

type CrewsListProps = {
  crews: null | ICrew[];
};

const CrewsWrapper: React.FC<CrewsListProps> = ({ crews }) => {
  const [sortedCrews, setSortedCrews] = useState<ICrew[] | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (crews === null) {
      setSortedCrews(null);
      dispatch(changeSelectedCrewToEmpty());
    } else {
      const localSortedCrews = [...crews].sort(sortCrews);
      dispatch(changeSelectedCrewToValue(localSortedCrews[0]));
      setSortedCrews(localSortedCrews);
    }
  }, [crews]);

  const sortCrews = (a: ICrew, b: ICrew) => {
    return a.distance - b.distance;
  };

  return (
    <div className="crews-wrapper">
      {sortedCrews === null ? (
        <p>Здесь будет список машин!</p>
      ) : (
        sortedCrews.map((el: ICrew) => (
          <div id={el.crew_id} key={el.crew_id} className="crews-wrapper__crew">
            <img src={taxi} alt="taxi" className="crews-wrapper__crew__img" />
            <div className="crews-wrapper__crew__info">
              <span className="crews-wrapper__crew__info__model">
                {el.car_mark + " " + el.car_model}
              </span>
              <span>{el.car_color}</span>
            </div>
            <span className="crews-wrapper__crew__distance">
              {el.distance} м
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CrewsWrapper;
