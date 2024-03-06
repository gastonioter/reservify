import styled from "styled-components";

const StyledHeader = styled.header`
  border-bottom: solid 1px var(--color-gray-100);
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
`;

function Header() {
  return <StyledHeader>header</StyledHeader>;
}

export default Header;
