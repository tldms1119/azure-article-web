import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
    background-color: #a4d1c7;

    ul {
        display: flex;
    }

    li {
        font-size: 1.5em;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 20px;
        padding-left: 20px;
    }
`;

function Header () {
    return (
        <HeaderContainer>
            <ul>
                <li>
                    <NavLink to="/articles">목록</NavLink>
                </li>
                <li>
                    <NavLink to="/articles/register">등록</NavLink>
                </li>
            </ul>
        </HeaderContainer>
    )
}

export default Header;