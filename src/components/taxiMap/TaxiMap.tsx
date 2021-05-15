import axios from "axios";
import { Map, Placemark, YMaps, YMapsProps } from "react-yandex-maps";
import { Dispatch, SetStateAction } from "react";
import { ICrew } from "../../interfaces";
import "./taxiMap.scss";

type TaxtMapProps = {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  addressCoords: number[];
  setAddressCoords: Dispatch<SetStateAction<number[]>>;
  mapCoords: number[];
  crews: null | ICrew[];
};

const TaxiMap: React.FC<TaxtMapProps> = ({
  address,
  setAddress,
  addressCoords,
  setAddressCoords,
  mapCoords,
  crews,
}) => {
  const setClickPosition = (event: YMapsProps) => {
    const apiKey: string = "177e6c11-088c-4732-b080-1c22c5eb357c";
    const coordinates = event.get("coords");

    setAddressCoords(coordinates);

    const reverseCoordinates: number[] = coordinates.reverse();
    const location: string = reverseCoordinates.join();

    const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${location}`;

    axios.get(url).then((resp) => {
      const data: [] =
        resp.data.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.Address.Components;

      let street: string = "";
      let house: string = "";

      data.forEach((el: { kind: string; name: string }): void => {
        if (el.kind === "street") {
          street = el.name;
        } else if (el.kind === "house") {
          house = el.name;
        }
      });

      if (street === "" || house === "") {
        setAddress("");
      } else {
        const targetName: string = `${street}, ${house}`;
        setAddress(targetName);
      }
    });
  };

  const availableAddressMark = (
    <Placemark
      geometry={addressCoords}
      options={{ preset: "islands#yellowDotIcon" }}
    />
  );
  const unavailableAddressMark = (
    <Placemark
      geometry={addressCoords}
      options={{ preset: "islands#redStretchyIcon" }}
      properties={{
        iconContent: "Адрес не найден",
      }}
    />
  );

  return (
    <div className="taxi-map">
      <YMaps>
        <Map state={{ center: mapCoords, zoom: 17 }} onClick={setClickPosition} width="600px" height="350px">
          {crews !== null &&
            crews.map((el: ICrew) => (
              <Placemark
                key={el.crew_id}
                geometry={[el.lat, el.lon]}
                options={{ preset: "islands#darkGreenAutoIcon" }}
              />
            ))}
          {address === "" ? unavailableAddressMark : availableAddressMark}
        </Map>
      </YMaps>
    </div>
  );
};

export default TaxiMap;
