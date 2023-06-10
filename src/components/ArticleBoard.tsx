import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Table, TableBody, TableHead } from "../styles/ArticleBoard";
import { getArticles } from "../api/articleBoard";
import { NavLink } from "react-router-dom";

/**
 * @description 게시판
 */
function ArticleBoard() {
    // state
    const [searchWord, setSearchWord] = useState<string>("");
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        requestListData(searchWord);
    }, []);

    // event
    const onchange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchWord((prevState) => e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        requestListData(searchWord);
    };

    // method
    const requestListData = async (searchWord: string) => {
        const response = await getArticles(searchWord);
        const { resultList } = response;
        setList(resultList);
    };

    // view
    return (
        <>
            {/* 버튼에 onClick 을 붙일수도 있지만 되도록이면 form 태그를 사용하는 것을 추천 */}
            <form onSubmit={onSubmit}>
                <div>
                    <input value={searchWord} onChange={onchange} />
                    <button>검색</button>
                </div>
            </form>
            <Table>
                <colgroup>
                    <col width="5%"/>
                    <col width="10%"/>
                    <col width="45%"/>
                    <col width="40%"/>
                </colgroup>
                <TableHead>
                    <tr>
                        <th>No.</th>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>이미지 주소</th>
                    </tr>
                </TableHead>
                <TableBody>
                    {list.map(
                        (
                            {
                                id,
                                category,
                                title,
                                thumb
                            },
                            index
                        ) => (
                            <tr key={index}>
                                <th scope="row">{list.length - index}</th>
                                <td>{category}</td>
                                <td><NavLink to={`/articles/${id}`} state={{id}}>{title}</NavLink></td>
                                <td>{thumb}</td>
                            </tr>
                        )
                    )}
                </TableBody>
            </Table>
        </>
    );
}

export default ArticleBoard;