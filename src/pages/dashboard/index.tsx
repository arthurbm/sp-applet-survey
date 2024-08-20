import { SelectField } from "@/components/hook-form-fields";
import { useJourney } from "@/hooks/use-journey";
import { useMapById } from "@/hooks/use-map";
import { useMe } from "@/hooks/use-me";
import { useMyJourneys } from "@/hooks/useMyJourneys";
import { logout } from "@/services/auth";
import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const methods = useForm();

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  const { user } = useMe();

  const { data: journeys, isPending: journeysIsPending } = useMyJourneys({
    size: 9999,
  });

  const selectedJourney = methods.watch("journey");

  const { data: journey, isPending: journeyIsPending } = useJourney(
    selectedJourney,
    {
      enabled: !!selectedJourney && !journeysIsPending,
    }
  );

  const selectedMap = methods.watch("map");

  const { data: map } = useMapById(selectedMap, {
    enabled: !!selectedMap && !journeyIsPending,
  });

  return (
    <Container pt={10}>
      <VStack spacing={4} align={"left"} w={"full"}>
        <Heading>Applet template</Heading>
        <Text>Olá, {user?.name}</Text>journeysIsPending
        <FormProvider {...methods}>
          <SelectField label="Selecione a jornada" fieldName="journey">
            {journeys?.pages[0].content.map((journey) => (
              <option key={journey.id} value={journey.id}>
                {journey.title}
              </option>
            ))}
          </SelectField>

          <SelectField label="Selecione o mapa" fieldName="map">
            {journey?.maps.map((map) => (
              <option key={map.id} value={map.id}>
                {map.title}
              </option>
            ))}
          </SelectField>

          <SelectField label="Selecione o ponto" fieldName="point">
            {map?.points.map((point) => (
              <option key={point.id} value={point.id}>
                {point.title}
              </option>
            ))}
          </SelectField>
        </FormProvider>
        <Button onClick={handleLogout} colorScheme="pink">
          sair
        </Button>
      </VStack>
    </Container>
  );
};

export default Dashboard;
