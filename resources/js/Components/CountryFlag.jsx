import React from "react";
import countryData from "../../assets/util/banderas.json";

function CountryFlag({ countryName }) {
  const flagClass = countryData.find(
    (country) => country.nombre.toLowerCase() === countryName.toLowerCase()
  );

  return <span className={`flag flag-${flagClass.codigo}`} />;
}

export default CountryFlag;
