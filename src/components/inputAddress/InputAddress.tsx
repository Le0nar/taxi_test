import axios from "axios";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/debounce.hook";

type InputAddressProps = {
  address: string;
  setAddress: any;
  addressCoords: any;
  setAddressCoords: any;
  setMapCoords: any;
};

const InputAddress: React.FC<InputAddressProps> = ({ address, setAddress, addressCoords, setAddressCoords, setMapCoords}) => {
  const [isValidInputValue, setIsValidInputValue] = useState(true)
  const [inputValue, setInputValue] = useState("")

  const debouncedSearchTerm = useDebounce(inputValue, 1000);

  const showInvalidInput = () => {
    setIsValidInputValue(false)
  }

  useEffect(() => {
    if (addressCoords !== [0, 0]) {
      setIsValidInputValue(true)
    }
  }, [addressCoords])

  useEffect(() => {
    if (debouncedSearchTerm) {

      setIsValidInputValue(true)
      const testResult = checkInputValue(inputValue);
      let ckheckedValue: string = "";

      if (testResult === null) {
        showInvalidInput()
        return
      } 
      ckheckedValue = testResult[0];
      if (address !== inputValue) {
        setAddressCoords([0,0])
        setAddressCoordsFromName(ckheckedValue)
      }

    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setInputValue(address)
  }, [address])

  const checkInputValue = (address: string) => {
    const regexp = /(\S+\s){1,3}\S+/;
    const verifedValue = address.match(regexp);
    return verifedValue;
  };



  const setAddressCoordsFromName = (adress: string): void => {
    const apiKey: string = "177e6c11-088c-4732-b080-1c22c5eb357c";
    const { street, house } = getStreetAndHouse(adress);
    const city: string = "Ижевск";

    const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${city}+${street}+${house}`;

    axios.get(url).then((resp) => {
      if (!resp.data.response.GeoObjectCollection.featureMember[0]) {
        return
      }
      const coordinates: string =
        resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
          .pos;

      const correctCoordinates = coordinates.split(" ");

      const lat = +correctCoordinates[1];
      const lon = +correctCoordinates[0];

      if ((lat === 56.852676) && (lon === 53.206891)) {
        showInvalidInput()
      } else if ((lat === 56.852676) && (lon === 53.2069)) {
        showInvalidInput()
      } else {

        setAddress(inputValue);
        setAddressCoords([lat, lon]);
        setMapCoords([lat, lon])
      }
    });
  };

  const getStreetAndHouse = (
    adress: string
  ): { street: string; house: string | undefined } => {
    const addressWithoutComma: string = adress.replace(",", "");

    const addressItems: string[] = addressWithoutComma.split(" ");
    const house = addressItems.pop();
    const street = addressItems.join(" ");

    return { street, house };
  };


  return (
    <div className="input-adress">
      {/* TODO: при клике на лейбл, сделать активным инпут */}
      <label>Откуда</label>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      {!isValidInputValue && <span>Адресс не найден</span>}
    </div>
  );
};

export default InputAddress;