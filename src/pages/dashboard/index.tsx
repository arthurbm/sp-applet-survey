import { SelectField } from "@/components/hook-form-fields";
import { useJourney } from "@/hooks/use-journey";
import { useMapById } from "@/hooks/use-map";
import { useMe } from "@/hooks/use-me";
import { useMyJourneys } from "@/hooks/useMyJourneys";
import { logout } from "@/services/auth";
import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { useDivergencePointById } from "@/hooks/use-divergence-point";

const schema = object({
  journeyId: string().required(),
  mapId: string().required(),
  pointId: string().required(),
  questionId: string().required(),
});

type SchemaType = InferType<typeof schema>;

const Dashboard: React.FC = () => {
  const router = useRouter();

  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: {
      journeyId: "",
      mapId: "",
      pointId: "",
      questionId: "",
    },
  });

  const { journeyId, mapId, pointId } = methods.watch();

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

  const { data: divergencePoint, isPending: divergencePointIsPending } =
    useDivergencePointById(pointId, {
      enabled: !!pointId,
    });

  useEffect(() => {
    methods.setValue("mapId", "");
    methods.setValue("pointId", "");
    methods.setValue("questionId", "");
  }, [journey, methods]);

  useEffect(() => {
    methods.setValue("pointId", "");
    methods.setValue("questionId", "");
  }, [map, methods]);

  useEffect(() => {
    methods.setValue("questionId", "");
  }, [divergencePoint, methods]);

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  const onSubmit = (data: SchemaType) => {
    router.push(`/dashboard/survey/${data.pointId}/${data.questionId}`);
  };

  return (
    <Container pt={10}>
      <VStack spacing={4} align={"left"} w={"full"}>
        <Heading>Strateegia Survey</Heading>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <VStack spacing={4} align={"left"} w={"full"}>
              <SelectField
                label="Selecione a jornada"
                fieldName="journeyId"
                isDisabled={
                  journeysIsPending || journeys.pages[0].content.length === 0
                }
              >
                <option value="">Selecione uma jornada</option>
                {journeys.pages[0].content.map((journey) => (
                  <option key={journey.id} value={journey.id}>
                    {journey.title}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="Selecione o mapa"
                fieldName="mapId"
                isDisabled={
                  !journeyId ||
                  journeyIsPending ||
                  !journey?.maps ||
                  journey.maps.length === 0
                }
              >
                <option value="">Selecione um mapa</option>
                {journey?.maps?.map((map) => (
                  <option key={map.id} value={map.id}>
                    {map.title}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label="Selecione o ponto"
                fieldName="pointId"
                isDisabled={
                  !mapId ||
                  mapIsPending ||
                  !map?.points ||
                  map.points.length === 0
                }
              >
                <option value="">Selecione um ponto</option>
                {map?.points
                  ?.filter((point) => point.point_type === "DIVERGENCE")
                  .map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.title}
                    </option>
                  ))}
              </SelectField>

              <SelectField
                label="Selecione a questão"
                fieldName="questionId"
                isDisabled={
                  !pointId ||
                  divergencePointIsPending ||
                  !divergencePoint?.tool.questions ||
                  divergencePoint.tool.questions.length === 0
                }
              >
                <option value="">Selecione uma questão</option>
                {divergencePoint?.tool.questions?.map((question) => (
                  <option key={question.id} value={question.id}>
                    {question.question}
                  </option>
                ))}
              </SelectField>

              <Button type="submit" colorScheme="blue" w="full">
                Escolher
              </Button>
            </VStack>
          </form>
        </FormProvider>
        <Button onClick={handleLogout} colorScheme="pink" w="20">
          sair
        </Button>
      </VStack>
    </Container>
  );
};

export default Dashboard;
