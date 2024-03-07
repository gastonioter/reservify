import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const MainStyled = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  background-color: var(--color-grey-50);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <GridContainer>
      <Header />
      <Sidebar />
      <MainStyled>
        <Container>
          <Outlet />
        </Container>
      </MainStyled>
    </GridContainer>
  );
}

export default AppLayout;
