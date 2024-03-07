import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 1rem;
  ${(props) =>
    props.orientation === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
        `}
`;

Row.defaultProps = {
  orientation: "horizontal",
};
export default Row;
