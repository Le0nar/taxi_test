import axios from "axios";

type InputAddressProps = {
    address: string,
    setAddress: any
}

const InputAddress:React.FC<InputAddressProps> = ({address, setAddress}) => {

    const setAddressCoordsFromName = (adress: string): void => {
        const apiKey: string = "177e6c11-088c-4732-b080-1c22c5eb357c";
        const { street, house } = getStreetAndHouse(adress);
        const city: string = "Ижевск";
    
        const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${city}+${street}+${house}`;
    
        axios.get(url).then((resp) => {
          const coordinates: string =
            resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
              .pos;
    
          const correctCoordinates = coordinates.split(",");
    
          correctCoordinates.forEach((el) => parseInt(el));
    
          console.log(correctCoordinates);
        });
      };

      const getStreetAndHouse = (adress: string): {street: string, house: string | undefined} => {
        const addressWithoutComma: string = adress.replace(",", "");
    
        const addressItems: string[] = addressWithoutComma.split(" ");
        const house = addressItems.pop();
        const street = addressItems.join(" ");
    
        return { street, house };
      };

    const handleChange = (event: any) => {
        const value = event.target.value; 
        setAddress(value)


        const regexp = /(\S+\s){1,3}\S+/
        const verifedValue = value.match(regexp)

        if (verifedValue) {
            // TODO: вызвать функцию, которая ставит метку на координаты из геокодирования
            console.log(verifedValue[0])
        }
    }

    return (
        <div className="input-adress">
            {/* TODO: при клике на лейбл, сделать активным инпут */}
            <label>Откуда</label>
            <input type="text"  onChange={handleChange} value={address} />
        </div>
    )
}

export default InputAddress