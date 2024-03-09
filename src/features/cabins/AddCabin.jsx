import CreateCabinForm from "../cabins/CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
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
