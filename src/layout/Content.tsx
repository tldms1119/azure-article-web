import { Outlet } from "react-router-dom";

import styled from "styled-components";

const ContentContainer = styled.div`
    margin-top : 20px;
`;

function Content () {
    return (
        <ContentContainer>
            <Outlet/>
        </ContentContainer>
    );
}

export default Content;