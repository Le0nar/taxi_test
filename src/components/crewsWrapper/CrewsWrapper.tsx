import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSelectedCrewToEmpty, changeSelectedCrewToValue } from "../../redux/selectedCrew/selectedCrewActions";

type CrewsListProps = {
  crews: any;
};

const CrewsWrapper: React.FC<CrewsListProps> = ({ crews }) => {
  const [sortedCrews, setSortedCrews] = useState<[] | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (crews === null) {
      setSortedCrews(null);
      dispatch(changeSelectedCrewToEmpty());
    } else {
      const localSortedCrews: any = [...crews].sort(sortCrews);
      dispatch(changeSelectedCrewToValue(localSortedCrews[0]));
      setSortedCrews(localSortedCrews);
    }
  }, [crews]);

  const sortCrews = (a: any, b: any) => {
    // TODO: add interface for arguments
    return a.distance - b.distance;
  };

  return (
    <div className="crews-wrapper">
      {sortedCrews === null ? (
        <p>Здесь будет список машин!</p>
      ) : (
        sortedCrews.map((el: any) => (
          <div id={el.crew_id} key={el.crew_id}>
            <img src="" alt="" />
            <div>
              <span>
                {el.car_mark} {el.car_model}
              </span>
              <span>{el.car_color}</span>
            </div>
            <span>{el.distance} м</span>
          </div>
        ))
      )}
    </div>
  );
};

export default CrewsWrapper;
