import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import Row from "./Row";
import { useDeleteCabin } from "../features/cabins/useDeleteCabin";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onCloseModal, onDelete, disabled }) {
  return (
    <StyledConfirmDelete>
      <Row orientation="vertical">
        <Heading as="h3">Delete {resourceName}</Heading>
        <p>
          Are you sure you want to delete this <strong>{resourceName}</strong>{" "}
          permanently? This action cannot be undone.
        </p>
      </Row>
      <Row>
        <Button type="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="danger" disabled={disabled} onClick={onDelete}>
          Delete
        </Button>
      </Row>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
