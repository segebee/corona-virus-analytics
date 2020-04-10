import { useState, useEffect } from "react";
import Layout from "../components/layout";
import fetch from "isomorphic-unfetch";
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

const apiUrl = "https://covid19.mathdro.id/api/";
const recoveredColor = "#079F41";
const deathColor = "#ED163D";

const useStats = url => {
  const [stats, setStats] = useState({
    confirmed: {
      value: 0
    },
    recovered: {
      value: 0
    },
    deaths: {
      value: 0
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const data = await fetch(url).then(res => res.json());
      console.log({ data });
      setStats(data);
      setLoading(false);
    }
    // setTimeout(() => fetchStats(), 15000);
    fetchStats();
  }, [url]);

  return { stats, loading };
};

const useCountries = url => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      const data = await fetch(url).then(res => res.json());
      console.log({ data });
      setCountries(data.countries);
      setLoading(false);
    }
    fetchCountries();
  }, [url]);

  return { countries, loading };
};

const getPercentage = (amount, total) => ((amount / total) * 100).toFixed(2);

const Index = props => {
  const { stats: worldStats, loading: worldLoading } = useStats(apiUrl);
  const { confirmed, recovered, deaths } = worldStats;
  const { countries, loading: countriesLoading } = useCountries(
    `${apiUrl}countries`
  );
  console.log({ countries });
  const [currentCountry, setCurrentCountry] = useState({
    name: "Nigeria",
    iso2: "NG",
    iso3: "NGA"
  });
  const { stats: countryStats, loading: countryStatsLoading } = useStats(
    `${apiUrl}countries/${currentCountry.iso3}`
  );
  const {
    confirmed: countryConfirmed,
    recovered: countryRecovered,
    deaths: countryDeaths
  } = countryStats;
  console.log({ countryStats });

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
    <Layout>
      <Flex justifyContent="space-between">
        <Box w="48%" p={4} borderWidth="1px" rounded="lg">
          <Flex justifyContent="center" mb={5}>
            <img id="globe" src="/globe.svg" />
          </Flex>

          <Flex justifyContent="center" mb={5}>
            <Heading as="h2" size="md">
              WORLD CORONA VIRUS SUMMARY
            </Heading>
          </Flex>

          <Divider />

          <Flex>
            {worldLoading && (
              <Flex flex="1" justifyContent="center" mt={5} mb={5}>
                <Spinner size="xl" color="red.500" />
              </Flex>
            )}

            {!worldLoading && (
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
        </Box>

        <Box w="48%" p={4} borderWidth="1px" rounded="lg">
          {/* <Flex justifyContent="center" mt={10} mb={5}>
            <Heading as="h2" size="md">
              COUNTRIES CORONA VIRUS SUMMARY
            </Heading>
          </Flex> */}

          {/* <Divider /> */}

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
            {countryStatsLoading && (
              <Flex flex="1" justifyContent="center" mt={5} mb={5}>
                <Spinner size="xl" color="red.400" />
              </Flex>
            )}

            {!countryStatsLoading && (
              <>
                <Box flex="1" className="stat-container">
                  <Stat>
                    <StatLabel textAlign="center">Confirmed Cases</StatLabel>
                    <StatNumber textAlign="center">
                      {countryConfirmed.value.toLocaleString()}
                    </StatNumber>
                  </Stat>
                </Box>

                <Box flex="1" className="stat-container">
                  <Stat>
                    <StatLabel textAlign="center" color={recoveredColor}>
                      Recoveries
                    </StatLabel>
                    <StatNumber textAlign="center">
                      {countryRecovered.value.toLocaleString()}
                    </StatNumber>
                    <StatHelpText textAlign="center" color={recoveredColor}>
                      {getPercentage(
                        countryRecovered.value,
                        countryConfirmed.value
                      )}{" "}
                      %
                    </StatHelpText>
                  </Stat>
                </Box>

                <Box flex="1" className="stat-container">
                  <Stat>
                    <StatLabel textAlign="center" color={deathColor}>
                      Deaths
                    </StatLabel>
                    <StatNumber textAlign="center">
                      {countryDeaths.value.toLocaleString()}
                    </StatNumber>
                    <StatHelpText textAlign="center" color={deathColor}>
                      {getPercentage(
                        countryDeaths.value,
                        countryConfirmed.value
                      )}{" "}
                      %
                    </StatHelpText>
                  </Stat>
                </Box>
              </>
            )}
          </Flex>
          <Divider />
        </Box>
      </Flex>
      <style jsx>
        {`
          img#globe {
            height: 100px;
            animation-name: spin;
            animation-duration: 15s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

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
    </Layout>
  );
};

// Index.getInitialProps = async function() {
//   const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   const data = await res.json();

//   console.log(`Show data fetched. Count: ${data.length}`);

//   return { shows: data.map(entry => entry.show) };
// };

export default Index;
