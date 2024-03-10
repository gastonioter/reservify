import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "../cabins/CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { HiDocumentDuplicate, HiPencil, HiTrash } from "react-icons/hi2";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const { id, discount, image, name, regularPrice, maxCapacity } = cabin;
  const { isCreating: isDuplicating, createCabin: duplicateCabin } =
    useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  function handleDuplicate() {
    duplicateCabin({
      name: `Copy of ${name}`,
      discount,
      image,
      regularPrice,
      maxCapacity,
    });
  }

  return (
    <Table.Row role="row">
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <Capacity>Fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>

      <Actions>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button
                icon={<HiDocumentDuplicate />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="cabin-update">
                <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="cabin-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="cabin-update">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="cabin-delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onDelete={() => deleteCabin(id)}
              />
            </Modal.Window>
            
          </Menus.Menu>
        </Modal>
      </Actions>
    </Table.Row>
  );
}

export default CabinRow;
