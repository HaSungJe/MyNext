'use client';
import axios from "axios";
import { getAccessToken } from '@/api/auth';

/**
 * 파일 업로드
 * 
 * @param dir
 * @param file 
 * @returns 
 */
export async function uploadFile(dir: string, file: File): Promise<any> {
    try {
        // 썸네일 등록여부
        const thumb_yn = file.type.startsWith('image/') ? 'Y' : 'N'

        // 1. 파일 정보 Binary로 변환
        const arrayBuffer = await new Promise<ArrayBuffer>(async (resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: any) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
        
        const binary = new Uint8Array(arrayBuffer);

        // 2. Presigned URL 발급
        const accessToken = await getAccessToken();
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/file/presigned`,
            {
                path_head: dir,
                files: [
                    {
                        file_name: file.name,
                        file_ext: file.name.substring(file.name.lastIndexOf('.') + 1),
                        mime_type: file.type,
                        file_size: file.size,
                        thumb: thumb_yn
                    }
                ]
            },
            {headers: {token: accessToken}}
        );

        const file_seq = parseInt(response.data.list[0]['url']['file_seq']);
        const presignedUrl = response.data.list[0]['url']['url'];
        const thumbnailPresignedUrl = thumb_yn === 'Y' ? response.data.list[0]['thumb_url']['url'] : null;
        const file_path = response.data.list[0]['url']['file_path'];

        // 3. 파일 업로드
        await axios.put(presignedUrl, binary, {
            headers: { 'Content-Type': 'application/octet-stream'}
        });


        // 3-2. 썸네일 업로드 TODO
        if (thumb_yn === 'Y') {
            // 리사이징
            const thumbnailBinary = await createThumbnail(file);

            // 업로드
            await axios.put(thumbnailPresignedUrl, thumbnailBinary, {
                headers: { 'Content-Type': 'application/octet-stream' }
            });
        }

        // 4. 파일 업로드 성공 처리
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/file/presigned/success`, {
            files: [
                {
                    file_seq: file_seq,
                    file_path: file_path
                }
            ]
        }, {headers: { token: accessToken }});

        return file_seq;
    } catch (error: any) {
        return null;
    }
}

/**
 * 이미지 썸네일 생성
 * 
 * @param file 
 * @returns 
 */
async function createThumbnail(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const reader = new FileReader();
        reader.onload = (e: any) => {
            img.src = e.target.result;
            img.onload = () => {
                const width = img.width / 3;
                const height = img.height / 3;
                canvas.width = width;
                canvas.height = height;
                ctx!.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (e: any) => resolve(new Uint8Array(e.target.result));
                        reader.onerror = (error) => reject(error);
                        reader.readAsArrayBuffer(blob);
                    } else {
                        reject(new Error('Failed to create thumbnail'));
                    }
                }, file.type);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

/**
 * 파일 여러개 삭제
 * - 등록 실패시 등에 사용
 * 
 * @param file_seqs 
 */
export async function deleteFileMulti(file_seqs: Array<number>): Promise<void> {
    if (file_seqs && file_seqs.length > 0) {
        const accessToken = await getAccessToken();
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/file/presigned/success`, {file_seqs}, {headers: { token: accessToken }});
    }
}