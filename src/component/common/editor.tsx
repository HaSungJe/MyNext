import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type QuillEditorProps = {
    value: string;
    setValueFunc: Function
}

// 툴바 옵션 설정
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'] // 포맷 초기화 버튼
    ],
};

// 포맷 설정
const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'link',
    'image',
];

/**
 * Editor
 * 
 * @param param0 
 * @returns 
 */
export function QuillEditor( {value, setValueFunc}: QuillEditorProps ) {
    const [editorHtml, setEditorHtml] = useState(value);
    function changeHandel(html: any) {
        setEditorHtml(html);
        setValueFunc(editorHtml);
    }

    useEffect(() => {
        setEditorHtml(value);
        // setValueFunc(value);
    }, [value]);

    useEffect(() => {
        setValueFunc(editorHtml);
    }, [editorHtml])

    return (
        <ReactQuill value={editorHtml} onChange={changeHandel} modules={modules} formats={formats} style={{height: '300px', marginBottom: '50px'}}/>
    )
}