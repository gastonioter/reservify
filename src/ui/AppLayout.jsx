import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const MainStyled = styled.main`
  padding: 4rem 4.8rem 6.4rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background-color: var(--color-grey-50);
`;
function AppLayout() {
  return (
    <GridContainer>
      <Header />
      <Sidebar />
      <MainStyled>
        <Outlet />
      </MainStyled>
    </GridContainer>
  );
}

export default AppLayout;
