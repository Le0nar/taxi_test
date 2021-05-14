import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark, YMapsProps } from "react-yandex-maps";
import getCurrentDate from "../../utils/getCurrentDate";
import CrewsWrapper from "../crewsWrapper/CrewsWrapper";
import InputAddress from "../inputAddress/InputAddress";
import OrderBtn from "../orderBtn/OrderBtn";
import SelectedCrew from "../selectedCrew/SelectedCrew";
import crewsData from "../../mock-data/crews.json";
import { dataAPI } from "../../mock-data/dataAPI";


const TaxiMap: React.FC = () => {
  const [address, setAddress] = useState("");
  const [addressCoords, setAddressCoords] = useState([0, 0]);
  const [mapCoords, setMapCoords] = useState([
    56.84755415049656, 53.20983911284374,
  ]);
  const [crews, setCrews] = useState<[] | null>(null);
  const [isPromptActive, setIsPromptActive] = useState(false);

  useEffect(() => {
    if (address !== "") {
      const currentDate = getCurrentDate();
      const lat = +addressCoords[1];
      const lon = +addressCoords[0];

      const searchParameters = {
        time: currentDate,
        addresses: [
          {
            address,
            lat,
            lon,
          },
        ],
      };

      getCrews(searchParameters);
    } else {
      setCrews(null);
    }
  }, [address]);

  const getCrews =  (parameters: any) => {
    // TODO: создать интерфейс и вынести интерфейс в src/interfaces.ts
    const mock = new MockAdapter(dataAPI);

    mock.onGet("/crews").reply(200, {
      crews: crewsData
    });
     
    dataAPI.get("/crews").then(function (response) {
      const crewsList = response.data.crews.crews[0].data.crews_info;
      setCrews(crewsList);
    });

  };

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
      <InputAddress
        address={address}
        setAddress={setAddress}
        setAddressCoords={setAddressCoords}
        addressCoords={addressCoords}
        setMapCoords={setMapCoords}
        isPromptActive={isPromptActive}
        setIsPromptActive={setIsPromptActive}
      />
      <SelectedCrew />
      <YMaps>
        <Map state={{ center: mapCoords, zoom: 17 }} onClick={setClickPosition}>
          {crews !== null &&
            crews.map((el: any) => (
              <Placemark
                key={el.crew_id}
                geometry={[el.lat, el.lon]}
                options={{ preset: "islands#darkGreenAutoIcon" }}
              />
            ))}
          {address === "" ? unavailableAddressMark : availableAddressMark}
        </Map>
      </YMaps>
      <CrewsWrapper crews={crews} />
      <OrderBtn address={address} addressCoords={addressCoords} isPromptActive={isPromptActive} setIsPromptActive={setIsPromptActive} />
    </>
  );
};

export default TaxiMap;