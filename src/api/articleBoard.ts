import client from "../plugin/client";

type Article = {
    id?: string,
    title: string,
    category: string,
    contents: string,
    thumb: string,
    password: string
}

const getArticles = async (searchWord: string) => {
    const url = searchWord ? `/admin/articles/search?searchWord=${searchWord}` : "/admin/articles";

    // 아래와 같이 사용해도 되고 custom hook 으로 진행해도 됨
    // try {
    //     const response = await client.get(url);
    // } catch (error) {
    //     // error
    // }

    const response = await client.get(url);
    // axios 의 특성 : 결과값은 data 라는 필드에 담아서 반환
    return response.data;
};

const getArticle = async (id: string) => {
    const url = `/admin/article?id=${id}`;
    const response = await client.get(url);
    // axios 의 특성 : 결과값은 data 라는 필드에 담아서 반환
    return response.data;
};

const updateArticle = async (article : Article) => {
    const url = `/admin/updatearticle`;
    const response = await client.post(url, article);
    // axios 의 특성 : 결과값은 data 라는 필드에 담아서 반환
    return response.data;
};

const insertArticle = async (article : Article) => {
    const url = `/admin/createarticle`;
    const response = await client.post(url, article);
    // axios 의 특성 : 결과값은 data 라는 필드에 담아서 반환
    return response.data;
};

export { getArticles, getArticle, updateArticle, insertArticle };