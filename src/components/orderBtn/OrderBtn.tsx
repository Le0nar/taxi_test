import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import getCurrentDate from "../../utils/getCurrentDate";

type OrderBtnProps = {
  address: string;
  addressCoords: any;
  isPromptActive: boolean;
  setIsPromptActive: any;
};
//TODO: import interface for orderParameters
const OrderBtn: React.FC<OrderBtnProps> = ({
  address,
  addressCoords,
  isPromptActive,
  setIsPromptActive,
}) => {
  const checkParameters = () => {
    if (address === "") {
      setIsPromptActive(true);
      return;
    }

    const currentDate = getCurrentDate();
    const lat: number = addressCoords[1];
    const lon: number = addressCoords[0];

    const orderParameters = {
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

  const sendOrder = (orderParameters: any) => {
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
