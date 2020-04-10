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
import { constants, getPercentage } from "../utils";
const { apiUrl, recoveredColor, deathColor } = constants;

function Globe() {
  return (
    <Flex justifyContent="center" mb={5}>
      <img id="globe" src="/globe.svg" />
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
        `}
      </style>
    </Flex>
  );
}

export default function() {
  const { stats, loading } = useStats(apiUrl);
  const { confirmed, recovered, deaths } = stats;

  return (
    <div>
      <Globe />

      <Flex justifyContent="center" mb={5}>
        <Heading as="h2" size="md">
          WORLD CORONA VIRUS SUMMARY
        </Heading>
      </Flex>

      <Divider />

      <Flex>
        {loading && (
          <Flex flex="1" justifyContent="center" mt={5} mb={5}>
            <Spinner size="xl" color="red.500" />
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
    </div>
  );
}
