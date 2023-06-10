import client from "../plugin/client";
import { useEffect } from "react";

/**
 * @description 비동기 인터셉터 훅 (custom hook : return 문으로 jsx 를 반환하지 않고 return 을 하지 않거나, recoil 처럼 다른 형태를 반환할 경우)
 */
function useAxiosInterceptor() {
    // useEffect(React 내 모든 훅) 는 컴포넌트와 커스텀 훅 내에서만 사용 가능
    useEffect(() => {
        // 요청
        // use => param1 : 요청 보내기 직전에 설정해야하는 값 (ex, 로딩바) param2 : 오류 발생 시 로직
        const requestInterceptor = client.interceptors.request.use(
            (config) => {
                console.log("비동기 요청");
                return config;
            },
            (error) => {
                console.log("비동기 요청 에러");
                // 비동기 통신을 강제로 끊어주는 로직 (try-catch 문 역할 담당)
                // 해당 로직이 없을 경우, 비동기 통신이 끝나지 않아서 무한 대기 상태가 될 수 있음
                Promise.reject(error);
            }
        );

        // 응답
        const responseInterceptor = client.interceptors.response.use(
            (config) => {
                console.log("비동기 응답");
                return config;
            },
            (error) => {
                console.log("비동기 응답 에러");
                // 비동기 통신을 강제로 끊어주는 로직 (try-catch 문 역할 담당)
                Promise.reject(error);
            }
        );

        // clean-up : 자원 해제
        return () => {
            client.interceptors.request.eject(requestInterceptor);
            client.interceptors.response.eject(responseInterceptor);
        };
    }, []);
}

export default useAxiosInterceptor;