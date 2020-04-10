import Layout from "../components/layout";
import { Flex, Box } from "@chakra-ui/core";

export default function About() {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4} borderWidth="1px" rounded="lg">
          <p>
            This project was built to aid analytics of the Corona Virus
            Pandemic.
          </p>
          <p>
            It is built using the popular covid19 api
            (https://covid19.mathdro.id/api/).
          </p>
          <p>Contributions and suggestions are welcome.</p>
        </Box>
      </Flex>
    </Layout>
  );
}
