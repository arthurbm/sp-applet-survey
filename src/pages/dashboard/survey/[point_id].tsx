import { InputField } from "@/components/hook-form-fields";
import { TextAreaField } from "@/components/text-area";
import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

const Survey = () => {
  const router = useRouter();
  console.log(router.query.point_id);

  const methods = useForm();

  return (
    <Container pt={10}>
      <VStack spacing={4} align={"left"} w="full">
        <Heading>Survey</Heading>

        <FormProvider {...methods}>
          <InputField
            fieldName="name"
            label="Nome da pessoa"
            placeholder="Preencha o nome da pessoa"
          />

          <InputField
            fieldName="email"
            label="E-mail"
            placeholder="Preencha o e-mail"
          />

          <InputField
            fieldName="phone"
            label="Telefone"
            placeholder="Preencha o telefone"
          />

          <InputField
            fieldName="age"
            label="Idade"
            placeholder="Preencha a idade"
          />

          <TextAreaField
            fieldName="answer"
            label="Resposta"
            placeholder={"Preencha a resposta"}
          />

          <Button type="submit" colorScheme="pink">
            Enviar
          </Button>
        </FormProvider>
      </VStack>
    </Container>
  );
};

export default Survey;
