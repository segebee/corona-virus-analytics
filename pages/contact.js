import Layout from "../components/Layout";
import { Flex, Box, Divider } from "@chakra-ui/core";

export default function() {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4} borderWidth="1px" rounded="lg">
          <p>NCDC Contacts</p>
          <ul>
            <li>0800-970000-10 (Toll-Free Call Centre)</li>
            <li>info@ncdc.gov.ng</li>
            <li>Whatsapp: +234708 711 0839</li>
            <li>SMS Number: +234809 955 5577</li>
          </ul>

          <Divider />

          <p>Project contributors.</p>
          <ul>
            <li>Twitter: @segebee</li>
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
