type CrewsListProps = {
  crews: any;
};

const CrewsWrapper: React.FC<CrewsListProps> = ({ crews }) => {

  return (
    <div className="crews-wrapper">
      {crews === null
        ? <p>Здесь будет список машин!</p>
        : crews.map((el: any) => (
            <div key={el.crew_id}>
              <img src="" alt="" />
              <div>
                <span>
                  {el.car_mark} {el.car_model}
                </span>
                <span>{el.car_color}</span>
              </div>
              <span>{el.distance} м</span>
            </div>
          ))}
    </div>
  );
};

export default CrewsWrapper;