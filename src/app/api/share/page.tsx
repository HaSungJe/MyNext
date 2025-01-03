'use client';
import * as kakaoSDK from 'kakao-js-sdk';
import { useEffect } from 'react';

export default function Page() {
    // 카카오톡 공유
    async function kakaoShare() {
        await kakaoSDK.initKakao(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);            
        if (window.Kakao.isInitialized()) {
            try {
                window.Kakao.Share.createDefaultButton({
                    container: '.btnKakaoShare',
                    objectType: 'feed',
                    content: {
                    title: '카카오 공유',
                    description: '#태그1 #태그2 #태그3 #태그4 #태그5',
                    imageUrl:'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                    link: {
                        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                        mobileWebUrl: 'http://localhost:5000',
                        webUrl: 'http://localhost:5000',
                    },
                    },
                    social: {
                    likeCount: 286,
                    commentCount: 45,
                    sharedCount: 845,
                    },
                    buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                        mobileWebUrl: 'http://localhost:5000',
                        webUrl: 'http://localhost:5000',
                        },
                    },
                    {
                        title: '앱으로 보기',
                        link: {
                        mobileWebUrl: 'http://localhost:5000',
                        webUrl: 'http://localhost:5000',
                        },
                    },
                    ],
                });
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        kakaoShare();
    }, []);

    return (
        <>
            <button type="button" className={`btnKakaoShare`}>
                <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" alt="카카오톡 공유 보내기 버튼" />
            </button>
        </>
    )
}