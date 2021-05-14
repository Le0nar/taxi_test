import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import getCurrentDate from "../../utils/getCurrentDate";
import { Dispatch, SetStateAction } from "react";
import { getSelectedCrewFromState } from "../../redux/selectors";
import { useSelector } from "react-redux";

type OrderBtnProps = {
  address: string;
  addressCoords: number[];
  isPromptActive: boolean;
  setIsPromptActive: Dispatch<SetStateAction<boolean>>;
};

const OrderBtn: React.FC<OrderBtnProps> = ({
  address,
  addressCoords,
  isPromptActive,
  setIsPromptActive,
}) => {
  const selectedCrew = useSelector(getSelectedCrewFromState);

  const checkParameters = () => {
    if (address === "") {
      setIsPromptActive(true);
      return;
    }

    const currentDate = getCurrentDate();
    const lat: number = addressCoords[1];
    const lon: number = addressCoords[0];

    const orderParameters = {
      crewID: selectedCrew.crew_id,
      time: currentDate,
      addresses: [
        {
          address,
          lat,
          lon,
        },
      ],
    };
    sendOrder(orderParameters);
  };

  const sendOrder = (orderParameters: {
    crewID: number;
    time: string;
    addresses: { address: string; lat: number; lon: number }[];
  }) => {
    const mock = new MockAdapter(axios);

    mock.onPost("/endpoint").replyOnce(200);

    axios
      .post("/endpoint", orderParameters)
      .then(() => {
        mock.onGet("/endpoint").reply(200, {
          order: {
            code: 0,
            descr: "OK",
            data: {
              order_id: 12345,
            },
          },
        });

        axios.get("/endpoint").then(function (response) {
          console.log(response.data);
        });
      })
      .catch(() => console.log("error"));
  };

  return (
    <button disabled={isPromptActive} onClick={checkParameters}>
      Заказать
    </button>
  );
};

export default OrderBtn;
