'use client';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FileProps = {
    id: string;
    classStr: string;
    path: string;
    maxHeight: number;
}

type ImageViewProps = {
    path: string;
    maxHeight: number;
}

type ImageViewMultiProps = {
    paths: Array<string>;
    maxHeight: number;
}

type FilesViewProps = {
    files: Array<any>;
    deleteFunction: Function;
}

type FileUploadMultiProps = {
    classStr: string;
    startCount: number,
    maxCount: number
}

// 일반 파일
export function File( {id, classStr}: FileProps ) {
    return (
        <input type="file" id={id} className={classStr}/>
    )
}

// 이미지 파일
export function ImageFile({id, classStr}: FileProps ) {
    return (
        <input type="file" id={id} className={classStr}/>
    )
}

// 이미지 보기
export function ImageView( {path, maxHeight}: ImageViewProps ) {
    const [loading, setLoading] = useState(false);
    const randomNumber = Math.random() * 100;
    const [size, setSize] = useState({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {        
        const img = imgRef.current;
        const handleLoad = () => {
            if (img) {
                if (maxHeight && img.naturalHeight > maxHeight) {
                    const ratio = maxHeight / img.naturalHeight;
                    setSize({ width: img.naturalWidth * ratio, height: img.naturalHeight * ratio });
                    setLoading(true);
                } else {
                    setSize({ width: img.naturalWidth, height: img.naturalHeight });
                    setLoading(true);
                }
            }
        }

        // 이미지 로드 이벤트 리스너 추가
        img.addEventListener('load', handleLoad);

        // 이미지가 이미 로드된 경우
        if (img.complete) {
            handleLoad();
        }

        return () => {
            // 컴포넌트 언마운트 시 리스너 제거
            img.removeEventListener('load', handleLoad);
        };
    }, [path]);


    if (loading) {
        return (
            <Image 
                key={`이미지파일_div_${new Date().getTime()}_${randomNumber}`} 
                src={path} alt={`이미지파일_${new Date().getTime()}_${randomNumber}`} 
                width={size['width']} 
                height={size['height']}
                style={{width: size['width'], height: size['height']}}
            />
        )
    } else {
        return (
            <div key={`이미지파일_div_${new Date().getTime()}_${randomNumber}`} style={{width: size['width'], height: size['height']}}>
                <Image
                    priority
                    alt={`이미지파일_${new Date().getTime()}_${randomNumber}`}
                    ref={imgRef}
                    src={path}
                    width={0} // 원본 너비 설정
                    height={0} // 원본 높이 설정
                    sizes="100vw"
                    style={{width: size['width'], height: size['height'] }}
                />
            </div>
        );
    }
}

// 이미지 보기 (여러개)
export function ImageViewMulti( {paths, maxHeight}: ImageViewMultiProps ) {
    return paths.map((path, index) => {
        return (
            <div key={`ImageViewSlide_${index}_${new Date().getTime()}_${index}`}>
                <ImageView path={path} maxHeight={maxHeight}/>
            </div>
        )
    });
}

// 이미지 파일 + 미리보기
export function ImageFileAndView({id, classStr, path, maxHeight}: FileProps ) {
    const [previewSrc, setPreviewSrc] = useState('');
    const [previewDisplay, setPreviewDisplay] = useState('none');

    useEffect(() => {
        if (path) {
            setPreviewSrc(path);
            setPreviewDisplay('');
        }
    }, [path]);
    
    function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const result = e.target?.result as string;
                    setPreviewSrc(result);
                    setPreviewDisplay('');
                };
                reader.readAsDataURL(file);
            } else {
                event.target.value = '';
                alert('이미지 파일만 선택 가능합니다.');
                setPreviewSrc('');
                setPreviewDisplay('none');
            }
        } else {
            setPreviewSrc('');
            setPreviewDisplay('none');
        }
    }

    return (
        <>
            {
                previewDisplay === '' ? <ImageView path={previewSrc} maxHeight={maxHeight}/> : ''
            }
            <input type="file" id={id} className={classStr}  onChange={onChangeFile}/>
        </>
    )
}

/**
 * 첨부파일 목록
 * - 다운로드 및 삭제
 * 
 * @param param0 
 * @returns 
 */
export function FilesView( {files, deleteFunction}: FilesViewProps) {
    async function deleteFile(key: string | number) {
        const check = confirm('삭제하시겠습니까?');
        if (check) {
            deleteFunction(key)
        }
    }

    if (files.length > 0) {
        return (
            <div className="view_file">
                <ul>
                    {
                        files.map((file) => {
                            return (
                                <li key={file.file_uuid}>
                                    <a href={file.file_path} className="btn_download" target="_blank" title="새창 다운로드">
                                        <span>{file.file_o_nm}</span>
                                        <span className="t_blue">({file.file_size})</span>
                                        <i className="xi-download"><span className="blind">다운로드</span></i>
                                    </a>
                                    <button type="button" className="add-delete" onClick={() => deleteFile(files[0]['file_uuid'])}></button>
                                </li>
                            )
                        })
                    }
                </ul>                 
            </div>
        )
    } else {
        return (
            '등록된 첨부파일이 없습니다.'
        )
    }
}

/**
 * 파일 업로드
 * - 여러개
 * - 파일추가시, 기존 파일 선택정보 유지
 * 
 * @param param0 
 * @returns 
 */
export function FileUploadMulti( {startCount, maxCount, classStr}: FileUploadMultiProps ) {
    const [files, setFiles] = useState([]);

    // 파일 등록칸 추가
    function addFile() {
        if (files.length < maxCount) {
            setFiles([...files, null]);
        } else {
            alert(`파일은 최대 ${maxCount}개까지 첨부 가능합니다.`);
        }
    }

    // 파일 등록칸 삭제
    function deleteFile() {
        if (files.length > 1) {
            const tmp_files = [];
            for (let i=0; i<files.length-1; i++) {
                tmp_files.push(null);
            }
    
            setFiles(tmp_files);
        }
    }

    useEffect(() => {
        const tmp_files = [];
        for (let i=0; i<startCount; i++) {
            tmp_files.push(null);
        }

        setFiles(tmp_files);
    }, []);

    return (
        <>
            <button type="button" className="n-btn btn-blue" onClick={addFile}>파일추가</button>
            <button type="button" className="n-btn btn-red" onClick={deleteFile}>삭제</button>
            {
                files.map((file, index) => {
                    return (
                        <input type="file" className={classStr} key={`file_multi_upload_${index}`}/>
                    )
                })
            }
        </>
    )
}