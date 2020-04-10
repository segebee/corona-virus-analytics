import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Spinner
} from "@chakra-ui/core";
import useStats from "../hooks/useStats";
import useCountries from "../hooks/useCountries";
import { constants, getPercentage } from "../utils";
const { apiUrl, recoveredColor, deathColor } = constants;

export default function() {
  const { countries, loading: countriesLoading } = useCountries(
    `${apiUrl}countries`
  );
  const [currentCountry, setCurrentCountry] = useState({
    name: "Nigeria",
    iso2: "NG",
    iso3: "NGA"
  });
  const { stats, loading } = useStats(
    `${apiUrl}countries/${currentCountry.iso3}`
  );
  const { confirmed, recovered, deaths } = stats;

  const handleCountryChange = event => {
    const { options, selectedIndex, value: iso3 } = event.target;
    const selectedOption = options[selectedIndex];
    const {
      text: name,
      dataset: { iso2 }
    } = selectedOption;
    setCurrentCountry({ name, iso2, iso3 });
  };

  return (
    <div>
      <Flex justifyContent="space-between" mt={5} alignItems="center">
        <Flex flex="1">
          <div className="country-name-header">
            <b>{currentCountry.name}</b>{" "}
            <span
              className={`flag-icon flag-icon-${currentCountry.iso2.toLowerCase()}`}
            />
          </div>
        </Flex>

        <Flex flex="1" justifyContent="flex-end">
          <select
            className="select-country"
            onChange={handleCountryChange}
            value={currentCountry.iso3}
          >
            {countriesLoading && (
              <option key="loading" value="">
                Loading...
              </option>
            )}

            {!countriesLoading && (
              <option key="default" value="">
                Select Country
              </option>
            )}

            {countries.map(country => (
              <option
                key={country.name}
                data-iso2={country.iso2}
                value={country.iso3}
              >
                {country.name}
              </option>
            ))}
          </select>
        </Flex>
      </Flex>

      <Divider />

      <Flex>
        {loading && (
          <Flex flex="1" justifyContent="center" mt={5} mb={5}>
            <Spinner size="xl" color="red.400" />
          </Flex>
        )}

        {!loading && (
          <>
            <Box flex="1" className="stat-container">
              <Stat>
                <StatLabel textAlign="center">Confirmed Cases</StatLabel>
                <StatNumber textAlign="center">
                  {confirmed.value.toLocaleString()}
                </StatNumber>
              </Stat>
            </Box>

            <Box flex="1" className="stat-container">
              <Stat>
                <StatLabel textAlign="center" color={recoveredColor}>
                  Recoveries
                </StatLabel>
                <StatNumber textAlign="center">
                  {recovered.value.toLocaleString()}
                </StatNumber>
                <StatHelpText textAlign="center" color={recoveredColor}>
                  {getPercentage(recovered.value, confirmed.value)} %
                </StatHelpText>
              </Stat>
            </Box>

            <Box flex="1" className="stat-container">
              <Stat>
                <StatLabel textAlign="center" color={deathColor}>
                  Deaths
                </StatLabel>
                <StatNumber textAlign="center">
                  {deaths.value.toLocaleString()}
                </StatNumber>
                <StatHelpText textAlign="center" color={deathColor}>
                  {getPercentage(deaths.value, confirmed.value)} %
                </StatHelpText>
              </Stat>
            </Box>
          </>
        )}
      </Flex>

      <Divider />

      <style jsx>
        {`
          .country-name-header {
            text-transform: uppercase;
            font-size: 18px;
          }

          .select-country {
            width: 200px;
            height: 40px;
            font-size: 18px;
            padding: 5px 30px;
          }

          select {
            outline: 0;
          }

          .flag-icon {
            box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
}
