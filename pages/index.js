import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/core";
import Layout from "../components/Layout";
import World from "../components/World";
import Country from "../components/Country";
import useStats from "../hooks/useStats";

const Index = props => {
  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Box w="48%" p={4} borderWidth="1px" rounded="lg">
          <World />
        </Box>

        <Box w="48%" p={4} borderWidth="1px" rounded="lg">
          <Country />
        </Box>
      </Flex>
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
