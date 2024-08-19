import { useMe } from "@/hooks/use-me";
import { logout } from "@/services/auth";
import { Button, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/");
    await logout();
  };

  const { user } = useMe();

  return (
    <Container>
      <Heading>Applet template</Heading>

      <p>Olá, {user?.name}</p>

      <Button onClick={handleLogout} colorScheme="pink">
        sair
      </Button>
    </Container>
  );
};

export default Dashboard;
