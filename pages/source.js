import Layout from "../components/Layout";
import { Flex, Box, Divider } from "@chakra-ui/core";

export default function() {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4} borderWidth="1px" rounded="lg">
          <p>
            This project is open-source and was built to aid analytics of the
            Corona Virus Pandemic.
          </p>
          <ul>
            <li>Github: https://github.com/segebee/corona-virus-analytics</li>
            <li>API: https://covid19.mathdro.id/api/</li>
            <li>Framework: NextJS (https://nextjs.org/)</li>
            <li>Design Framework: ChakraUI(https://chakra-ui.com/)</li>
            <li>Flags: https://github.com/lipis/flag-icon-css</li>
          </ul>

          <Divider />
          <p>Contributions and suggestions are welcome.</p>
        </Box>
      </Flex>
      <style jsx>
        {`
          ul {
            list-style-position: inside;
          }
        `}
      </style>
    </Layout>
  );
}
