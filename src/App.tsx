import React from 'react';
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import useAxiosInterceptor from './hook/useAxiosInterceptor';
import Content from './layout/Content';
import Header from './layout/Header';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 100px;
    margin-right: 100px;
`;

function App() {
  useAxiosInterceptor();

  return (
    <>
        <GlobalStyle />
        <AppContainer>
            <Header/>
            <Content/>
        </AppContainer>
    </>
);
}

export default App;
