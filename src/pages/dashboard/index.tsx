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
    if (!journeyId && journeys.pages[0].content.length > 0) {
      methods.setValue("journeyId", journeys.pages[0].content[0].id);
    }
  }, [journeys, journeyId, methods]);

  useEffect(() => {
    if (journey?.maps && journey.maps.length > 0) {
      methods.setValue("mapId", journey.maps[0].id);
    } else {
      methods.setValue("mapId", "");
    }
    methods.setValue("pointId", "");
    methods.setValue("questionId", "");
  }, [journey, methods]);

  useEffect(() => {
    if (map?.points && map.points.length > 0) {
      const divergencePoints = map.points.filter(
        (point) => point.point_type === "DIVERGENCE"
      );
      if (divergencePoints.length > 0) {
        methods.setValue("pointId", divergencePoints[0].id);
      }
    } else {
      methods.setValue("pointId", "");
    }
    methods.setValue("questionId", "");
  }, [map, methods]);

  useEffect(() => {
    if (
      divergencePoint?.tool.questions &&
      divergencePoint.tool.questions.length > 0
    ) {
      methods.setValue("questionId", divergencePoint.tool.questions[0].id);
    } else {
      methods.setValue("questionId", "");
    }
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
                isDisabled={journeysIsPending}
              >
                {journeysIsPending ? (
                  <option value="">Carregando...</option>
                ) : (
                  journeys.pages[0].content.map((journey) => (
                    <option key={journey.id} value={journey.id}>
                      {journey.title}
                    </option>
                  ))
                )}
              </SelectField>

              <SelectField
                label="Selecione o mapa"
                fieldName="mapId"
                isDisabled={!journeyId || journeyIsPending}
              >
                {journeyIsPending ? (
                  <option value="">Carregando...</option>
                ) : journey?.maps?.length ? (
                  journey.maps.map((map) => (
                    <option key={map.id} value={map.id}>
                      {map.title}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhum mapa disponível</option>
                )}
              </SelectField>

              <SelectField
                label="Selecione o ponto"
                fieldName="pointId"
                isDisabled={!mapId || mapIsPending}
              >
                {mapIsPending ? (
                  <option value="">Carregando...</option>
                ) : map?.points?.filter(
                    (point) => point.point_type === "DIVERGENCE"
                  ).length ? (
                  map.points
                    .filter((point) => point.point_type === "DIVERGENCE")
                    .map((point) => (
                      <option key={point.id} value={point.id}>
                        {point.title}
                      </option>
                    ))
                ) : (
                  <option value="">
                    Nenhum ponto de divergência disponível
                  </option>
                )}
              </SelectField>

              <SelectField
                label="Selecione a questão"
                fieldName="questionId"
                isDisabled={!pointId || divergencePointIsPending}
              >
                {divergencePointIsPending ? (
                  <option value="">Carregando...</option>
                ) : divergencePoint?.tool.questions?.length ? (
                  divergencePoint.tool.questions.map((question) => (
                    <option key={question.id} value={question.id}>
                      {question.question}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhuma questão disponível</option>
                )}
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
