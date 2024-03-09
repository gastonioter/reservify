import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import CreateCabinForm from "../cabins/CreateCabinForm";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { HiDocumentDuplicate, HiPencil, HiTrash } from "react-icons/hi2";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <Capacity>Fits up to {maxCapacity} guests</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>

        <Actions>
          <Modal>
            {/* Modal for DELETE */}
            <Modal.Open opens="delete">
              <Button size="small">
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                onDelete={() => deleteCabin(id)}
                disabled={isDeleting}
                resourceName={`Cabin ${name}`}
              />
            </Modal.Window>

            {/* Modal for UPDATE */}
            <Modal.Open opens="edit">
              <Button size="small">
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Button
            size="small"
            onClick={() =>
              duplicateCabin({
                name: `Copy of ${name}`,
                discount,
                image,
                regularPrice,
                maxCapacity,
              })
            }
            disabled={isDuplicating}
          >
            <HiDocumentDuplicate />
          </Button>
        </Actions>
      </TableRow>

      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}

export default CabinRow;
