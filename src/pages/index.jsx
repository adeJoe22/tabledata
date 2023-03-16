import React from "react";
import styled from "styled-components";
import people from "../data/people.json";
import DataTable from "../ui/datatable";

const HomePage = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <DataTable rows={people} />
        </Wrapper>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 50px;
  margin: 0 auto;
`;
