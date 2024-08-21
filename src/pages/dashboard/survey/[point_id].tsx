import { InputField } from "@/components/hook-form-fields";
import { TextAreaField } from "@/components/text-area";
import { useMutateComment } from "@/hooks/use-mutate-comment";
import { Button, Container, Heading, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InferType, object, string } from "yup";

const schema = object({
  answer: string().required(),
  name: string().optional(),
  email: string().optional(),
  phone: string().optional(),
  age: string().optional(),
});

type SchemaType = InferType<typeof schema>;

const Survey = () => {
  const router = useRouter();
  const divergencePointId = router.query.point_id as string;
  const questionId = router.query.question_id as string;

  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
  });

  const mutateComment = useMutateComment();

  const toast = useToast();

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const name = data.name ? `Nome: ${data.name}` : "";
      const email = data.email ? `E-mail: ${data.email}` : "";
      const phone = data.phone ? `Telefone: ${data.phone}` : "";
      const age = data.age ? `Idade: ${data.age}` : "";
      const answer = `Resposta: ${data.answer}`;

      const text = [answer, name, email, phone, age].join("\n");

      await mutateComment.mutateAsync({
        text: text,
        divergencePointId,
        questionId,
      });

      toast({
        title: "Resposta enviada com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar resposta",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container pt={10}>
      <VStack spacing={4} align={"left"} w="full">
        <Heading>Survey</Heading>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VStack spacing={4} align={"left"} w={"full"}>
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
        </form>
      </VStack>
    </Container>
  );
};

export default Survey;
