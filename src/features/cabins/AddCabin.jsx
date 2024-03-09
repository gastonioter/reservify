import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-new">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-new">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="cabin-list">
        <Button>View cabins</Button>
      </Modal.Open>
      <Modal.Window name="cabin-list">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
