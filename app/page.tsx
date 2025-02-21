import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Form from "../components/Form";
import { Suspense } from "react";
import Loading from "./loading";

const Page = () => {
  return (
    <main>
      <Container>
        <Suspense fallback={<Loading />}>
          <Box>
            <Card>
              <Form text="Form component" />
            </Card>
          </Box>
        </Suspense>
      </Container>
    </main>
  );
};

export default Page;
