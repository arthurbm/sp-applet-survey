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
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";

const schema = object({
  journeyId: string().required(),
  mapId: string().required(),
  pointId: string().required(),
});

type SchemaType = InferType<typeof schema>;

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useMe();

  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      journeyId: "",
      mapId: "",
      pointId: "",
    },
  });

  const { journeyId, mapId } = methods.watch();

  const {
    data: journeys = { pages: [{ content: [] }] },
    isPending: journeysIsPending,
  } = useMyJourneys({
    size: 9999,
  });

  const { data: journey, isPending: journeyIsPending } = useJourney(journeyId, {
    enabled: !!journeyId,
  });

  const { data: map, isPending: mapIsPending } = useMapById(mapId, {
    enabled: !!mapId,
  });

  // Set initial values if not set
  if (!journeyId && journeys.pages[0].content.length > 0) {
    methods.setValue("journeyId", journeys.pages[0].content[0].id);
  }

  if (
    journey?.maps &&
    journey.maps.length > 0 &&
    (!mapId || !journey.maps.some((m) => m.id === mapId))
  ) {
    methods.setValue("mapId", journey.maps[0].id);
    methods.setValue("pointId", ""); // Reset pointId when map changes
  }

  if (map?.points && map.points.length > 0 && !methods.getValues("pointId")) {
    methods.setValue("pointId", map.points[0].id);
  }

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  return (
    <Container pt={10}>
      <VStack spacing={4} align={"left"} w={"full"}>
        <Heading>Applet template</Heading>
        <Text>Olá, {user?.name}</Text>
        <FormProvider {...methods}>
          <SelectField
            label="Selecione a jornada"
            fieldName="journeyId"
            isDisabled={
              journeysIsPending || journeys.pages[0].content.length === 0
            }
          >
            {journeys.pages[0].content.length > 0 ? (
              journeys.pages[0].content.map((journey) => (
                <option key={journey.id} value={journey.id}>
                  {journey.title}
                </option>
              ))
            ) : (
              <option value="">No journeys available</option>
            )}
          </SelectField>

          <SelectField
            label="Selecione o mapa"
            fieldName="mapId"
            isDisabled={
              journeyIsPending || !journey?.maps || journey.maps.length === 0
            }
          >
            {journey?.maps && journey.maps.length > 0 ? (
              journey.maps.map((map) => (
                <option key={map.id} value={map.id}>
                  {map.title}
                </option>
              ))
            ) : (
              <option value="">No maps available</option>
            )}
          </SelectField>

          <SelectField
            label="Selecione o ponto"
            fieldName="pointId"
            isDisabled={mapIsPending || !map?.points || map.points.length === 0}
          >
            {map?.points && map.points.length > 0 ? (
              map.points.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.title}
                </option>
              ))
            ) : (
              <option value="">No points available</option>
            )}
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
