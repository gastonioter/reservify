import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
  border-right: solid 1px var(--color-gray-100);
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
