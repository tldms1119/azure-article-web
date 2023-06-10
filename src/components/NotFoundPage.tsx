import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
    height: 30px;
    width: 60px;
`;

/**
 * @description 잘못된 경로로 들어왔을 때 보여주는 컴포넌트
 */

function NotFoundPage() {
    // router-info
    const navigate = useNavigate();

    // event
    const onBack = () => {
        navigate(-1); // 뒤로가기
        // navigate("counter"); // 직접 path 경로 입력해도 된다.
    };

    // view
    return (
        <>
            <h1>잘못된 경로로 접근하였습니다.</h1>
            <Button onClick={onBack}>Back</Button>
        </>
    );
}

export default NotFoundPage;