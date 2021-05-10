import axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { YMaps, Map, Placemark, YMapsProps } from "react-yandex-maps";
import InputAddress from "../inputAddress/InputAddress";

const testMark = [55.75, 37.57];

const TaxiMap: React.FC = () => {
  const [address, setAddress] = useState("");

  const apiKey: string = "177e6c11-088c-4732-b080-1c22c5eb357c";

  const getCoordsFromName = (adress: string): void => {
    const { street, house } = getStreetAndHouse(adress);
    const city: string = "Ижевск";

    const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${city}+${street}+${house}`;

    axios.get(url).then((resp) => {
      const coordinates: string =
        resp.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point
          .pos;

      const correctCoordinates = coordinates.split(",");

      correctCoordinates.forEach((el) => parseInt(el));

      // TODO: save this value
      console.log(correctCoordinates);
    });
  };

  const getNameFromCoords = (event: YMapsProps) => {
    const coordinates = event.get("coords");

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
        setAddress("")
        // TODO: вызвать функцию, которая оставит метку красного цвета с надписью "Адрес не найден"
      } else {
        const targetName: string = `${street}, ${house}`;
        setAddress(targetName);
        // TODO: ставить метку желтого цвета
        // TODO: отправлять запрос на сервер
      }
    });
  };

  const getStreetAndHouse = (adress: string): {street: string, house: string | undefined} => {
    const addressWithoutComma: string = adress.replace(",", "");

    const addressItems: string[] = addressWithoutComma.split(" ");
    const house = addressItems.pop();
    const street = addressItems.join(" ");

    return { street, house };
  };

  return (
    <>
      <InputAddress address={address} setAddress={setAddress} />
      <YMaps>
        <Map state={{ center: testMark, zoom: 19 }} onClick={getNameFromCoords}>
          <Placemark
            geometry={testMark}
            options={{ preset: "islands#darkGreenAutoIcon" }}
          />
        </Map>
      </YMaps>
    </>
  );
};

export default TaxiMap;

// TODO: массив координатами машин, пришедший с сервера отрисовтаь через  .map <Placemark geometry={e.location} options={ { preset: 'islands#darkGreenAutoIcon' } } />
