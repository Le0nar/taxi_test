import axios from "axios";
import React, { useState } from "react";
import { YMaps, Map, Placemark, YMapsProps } from "react-yandex-maps";
import InputAddress from "../inputAddress/InputAddress";

const testMark = [56.86186,  53.23243];

const TaxiMap: React.FC = () => {
  const [address, setAddress] = useState("");
  const [addressCoords, setAddressCoords] = useState([3,3]);

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
        // TODO: вызвать функцию, которая оставит метку красного цвета с надписью "Адрес не найден"
      } else {
        const targetName: string = `${street}, ${house}`;
        setAddress(targetName);
        // TODO: ставить метку желтого цвета
        // TODO: отправлять запрос на сервер
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
    <>
      <InputAddress address={address} setAddress={setAddress} setAddressCoords={setAddressCoords} />
      <YMaps>
        <Map state={{ center: testMark, zoom: 18 }} onClick={setClickPosition}>
          {/* <Placemark
            geometry={testMark}
            options={{ preset: "islands#darkGreenAutoIcon" }}
          /> */}
          {address === "" ? unavailableAddressMark : availableAddressMark}
        </Map>
      </YMaps>
    </>
  );
};

export default TaxiMap;

// TODO: массив координатами машин, пришедший с сервера отрисовтаь через  .map <Placemark geometry={e.location} options={ { preset: 'islands#darkGreenAutoIcon' } } />
