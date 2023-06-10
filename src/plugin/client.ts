import axios from "axios";

// create 함수 이용한 초기 설정
// process.env 는 react 제공 변수
const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // headers: {
    //     common: {
    //         Authorization: "Bearer token",
    //     },
    // },
});

export default client;