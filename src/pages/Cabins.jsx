import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </Row>

      <Row orientation="vertical">
        <CabinTable></CabinTable>

        <Button onClick={() => setShowForm((show) => !show)}>
          Create New Cabin
        </Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
