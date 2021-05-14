import MockAdapter from "axios-mock-adapter";
import React, { useEffect, useState } from "react";
import getCurrentDate from "../../utils/getCurrentDate";
import CrewsWrapper from "../crewsWrapper/CrewsWrapper";
import InputAddress from "../inputAddress/InputAddress";
import OrderBtn from "../orderBtn/OrderBtn";
import SelectedCrew from "../selectedCrew/SelectedCrew";
import crewsData from "../../mock-data/crews.json";
import { dataAPI } from "../../mock-data/dataAPI";
import TaxiMap from "../taxiMap/TaxiMap";


const Main: React.FC = () => {
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
      <div className="">
        <TaxiMap address={address} setAddress={setAddress} addressCoords={addressCoords} setAddressCoords={setAddressCoords} mapCoords={mapCoords} crews={crews} />
        <CrewsWrapper crews={crews} />
      </div>
      <OrderBtn address={address} addressCoords={addressCoords} isPromptActive={isPromptActive} setIsPromptActive={setIsPromptActive} />
    </>
  );
};

export default Main;