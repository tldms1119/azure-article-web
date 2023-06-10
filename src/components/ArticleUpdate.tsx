import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RadioButton from "./RadioButton";
import { useLocation, NavLink } from "react-router-dom";
import { getArticle, updateArticle } from "../api/articleBoard";
import { Editor } from '@toast-ui/react-editor';

const Wrap = styled.div`
    padding: 10px;
    h3 {
        font-size: 1.5em;
    }
    input {
        margin-top: 10px;
        padding: 10px;
        width: 50%;
    }
    textarea {
        margin-top: 10px;
        padding: 10px;
        width: 70%;
        height: 300px;
    }
    div {
        display : flex;
        width : 100%
    }
`;

const Button = styled.button`
    margin-top: 10px;
    margin-left: 10px;
`;

type FormValues = {
    id: string;
  title: string;
  contents: string;
  category: string;
  thumb: string;
  password: string;
}

function ArticleUpdate () {

  // state
  const [formValues, setFormValues] = useState<FormValues>({
    id: '',
    title: '',
    contents: '',
    category: '',
    thumb: '',
    password: ''
  });

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    requestData();
  }, []);
  

  // event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      category: e.target.value,
    }));
  };

  const handleChangeEditor = () => {
    const html = editorRef.current?.getInstance().getHTML();
    setFormValues((prevValues) => ({
      ...prevValues,
      contents: html ? html : ''
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform any additional logic or submit the form
    // console.log(formValues);
    requestUpdate();
  };

  // method
  const location = useLocation();
  const requestData = async () => {
    const response = await getArticle(location.state.id);
    const { id, title, category, contents, thumb } = response;
    editorRef.current?.getInstance().setHTML(contents);
    setFormValues((prevValues) => ({
        ...prevValues,
        id, title, category, contents, thumb
      }));
};

const requestUpdate = async () => {
    const response = await updateArticle(formValues);
    if(response && response.result){
        alert('수정 완료');
        requestData();
      } else {
        console.error(response);
        alert('오류가 발생했네요');
      }
};

  return (
    <>
        <form onSubmit={handleSubmit}>
        <Wrap>
            <h3>제목</h3>
            <input
            type="text" 
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
            />
        </Wrap>

        <Wrap>
            <h3>카테고리</h3>
            <div>
                <RadioButton name="category" value="tab1" checked={formValues.category === 'tab1'} onChange={handleRadioChange}>기도</RadioButton>
                <RadioButton name="category" value="tab2" checked={formValues.category === 'tab2'} onChange={handleRadioChange}>말씀</RadioButton>
                <RadioButton name="category" value="tab3" checked={formValues.category === "tab3"} onChange={handleRadioChange}>추천</RadioButton>
            </div>
        </Wrap>

        <Wrap>
            <h3>이미지 주소</h3>
            <input
            type="text" 
            name="thumb"
            value={formValues.thumb}
            onChange={handleChange}
            required
            />
        </Wrap>

        <Wrap>
            <h3>내용</h3>
        </Wrap>
        <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="600px"
            onChange={handleChangeEditor}
            toolbarItems={[
              // 툴바 옵션 설정
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'image', 'link'],
              ['code', 'codeblock'],
            ]}
          />

        <Wrap>
            <h3>비밀번호</h3>
            <input
            type="password" 
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
            />
        </Wrap>

        <Button type="submit">수정</Button>
        <NavLink to="/articles">목록</NavLink>
        </form>
    </>
  );
};

export default ArticleUpdate;