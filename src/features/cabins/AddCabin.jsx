import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useFetchCabins } from "./useFetchCabins";

function AddCabin() {
  const { isLoading } = useFetchCabins();
  if (isLoading) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-new">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-new">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
