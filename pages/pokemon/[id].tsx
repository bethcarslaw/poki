import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { pokeApi } from "../../config";

interface PageProps {
  pokemon: any;
}

const PokemonPage: NextPage<PageProps> = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <>
      <Box
        p={4}
        borderWidth={"1rem"}
        borderRadius={8}
        borderColor={"#ffcb05"}
        backgroundColor={"#3c5aa6"}
        d={"inline-block"}
      >
        <Heading color="white" textTransform={"capitalize"}>
          {pokemon.name}
        </Heading>
        <Heading size="md">
          <Stack direction="row">
            {pokemon.types.map((type: any) => (
              <Box key={type.id} color="white">
                {type.type.name}
              </Box>
            ))}
          </Stack>
        </Heading>
        <Image src={pokemon.sprites.other["official-artwork"].front_default} />
      </Box>
    </>
  );
};

export default PokemonPage;

const getStaticPaths: GetStaticPaths = async () => {
  const response = await pokeApi.get("pokemon", {
    params: {
      limit: 1126,
    },
  });

  const paths = response.data.results.map((pokemon: any) => ({
    params: { id: pokemon.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await pokeApi.get(`pokemon/${params?.id}`);

  return {
    props: {
      pokemon: response.data || null,
    },
  };
};

export { getStaticProps, getStaticPaths };
