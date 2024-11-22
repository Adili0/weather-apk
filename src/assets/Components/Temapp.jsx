import React, { useEffect, useState } from 'react';
import './Temapp.css';

const Temapp = () => {
  const [search, setSearch] = useState("Mumbai");
  const [storeData, setStoreData] = useState({});
  const [err, setError] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d0b1d6a31d0cc475150929c66ea98ed2&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
          setError(`City not found (${response.status})`);
          setStoreData({});
          return;
        }

        const data = await response.json();
        setStoreData(data);
        setError("");
      } catch (err) {
        console.error('Error in API fetch:', err);
        setError("Unable to fetch data. Please try again.");
        setStoreData({});
      }
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <header className="user">
        <h1>Weather Now</h1>
        <h1>Adil</h1>
      </header>
      <br />

      <div className="weather">
        <input
          type="text"
          placeholder="Search City"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />

        {err ? (
          <div className="error">
            <h1>{err}</h1>
          </div>
        ) : (
          storeData?.name && (
            <>
              <div className="location">
                <span className="material-symbols-outlined">location_city</span>
                <h1>{storeData.name}</h1>
              </div>

              <h1 className="t1">{`Weather: ${storeData?.weather?.[0]?.main || ""}`}</h1>

              <h1 className="t2">Temperature</h1>
              <div className="temp">
                <h2>{`Temperature = ${storeData?.main?.temp}°C`}</h2>
                <h3 className="maximum-temp">
                  {`Min Temp: ${storeData?.main?.temp_min}°C | Max Temp: ${storeData?.main?.temp_max}°C`}
                </h3>
              </div>

              <h2 className="t3">Wind</h2>
              <div className="wind">
                <h3>{`Pressure = ${storeData?.main?.pressure}`}</h3>
                <p>{`Direction: ${storeData?.wind?.deg || 0}° | Speed: ${storeData?.wind?.speed || 0} m/s`}</p>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Temapp;
