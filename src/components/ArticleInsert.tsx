import React, { useState, useRef } from "react";
import styled from "styled-components";
import RadioButton from "./RadioButton";
import { useNavigate, NavLink } from "react-router-dom";
import { insertArticle } from "../api/articleBoard";
import '@toast-ui/editor/dist/toastui-editor.css';
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
  title: string;
  contents: string;
  category: string;
  thumb: string;
  password: string;
  open_yn: string;
}

function ArticleInsert () {

  // state
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    contents: '',
    category: '',
    thumb: '',
    password: '',
    open_yn: 'Y'
  });  

  const editorRef = useRef<Editor>(null);

  // event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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
    if(!formValues.contents || formValues.contents === '<p><br></p>'){
      alert('내용을 입력하세요');
      return;
    }
    // Perform any additional logic or submit the form
    // console.log(formValues);
    requestInsert();
  };

  // method
  const navigate = useNavigate();
const requestInsert = async () => {
    const response = await insertArticle(formValues);
    if(response && response.result){
      navigate("/articles");
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
                <RadioButton name="category" value="tab1" checked={formValues.category === "tab1"} onChange={handleRadioChange}>기도</RadioButton>
                <RadioButton name="category" value="tab2" checked={formValues.category === "tab2"} onChange={handleRadioChange}>말씀</RadioButton>
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
          initialValue= ""
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
            <h3>게시 여부</h3>
            <div>
                <RadioButton name="open_yn" value='Y' checked={formValues.open_yn === 'Y'} onChange={handleRadioChange}>게시</RadioButton>
                <RadioButton name="open_yn" value='N' checked={formValues.open_yn === 'N'} onChange={handleRadioChange}>숨김</RadioButton>
            </div>
        </Wrap>

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

        <Button type="submit">등록</Button>
        <NavLink to="/articles">목록</NavLink>
        </form>
    </>
  );
};

export default ArticleInsert;