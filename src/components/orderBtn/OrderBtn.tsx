import getCurrentDate from "../../utils/getCurrentDate";

type OrderBtnProps = {
    address: string;
    addressCoords: any;
    isPromptActive: boolean;
    setIsPromptActive: any;
  };
        //TODO: import interface for orderParameters
const OrderBtn: React.FC<OrderBtnProps> = ({address, addressCoords, isPromptActive, setIsPromptActive}) => {

    const checkParameters = () => {
        if (address === "") {
            setIsPromptActive(true)
            return
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

        console.log(orderParameters)
    }

    return <button disabled={isPromptActive} onClick={checkParameters}>Заказать</button>
}

export default OrderBtn