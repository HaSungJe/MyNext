'use client';
import * as kakaoSDK from 'kakao-js-sdk';
import { useEffect, useState } from 'react';

type KakaoShareProps = {
    web_href: string;
    mobile_href: string;
    imageUrl: string;
    title: string;
    descriptions: Array<string>;
}

export default function KakaoShare({web_href, mobile_href, imageUrl, title, descriptions}: KakaoShareProps) {
    const [buttonId, setButtonId] = useState(`btnKakaoShare_${new Date().getTime()}`);

    useEffect(() => {
        kakaoShare();
    }, []);

    // 카카오톡 공유
    async function kakaoShare() {
        await kakaoSDK.initKakao(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        if (window.Kakao.isInitialized()) {
            try {
                descriptions = descriptions.map((description: string) => {
                    return `#${description}`
                });

                window.Kakao.Share.createDefaultButton({
                    container: `#${buttonId}`,
                    objectType: 'feed',
                    content: {
                        title: title,
                        description: descriptions.join(' '),
                        imageUrl: imageUrl,
                        link: {
                            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                            mobileWebUrl: `${mobile_href}`,
                            webUrl: `${web_href}`,
                        },
                    },
                    // social: {
                    //     likeCount: 286,
                    //     commentCount: 45,
                    //     sharedCount: 845,
                    // },
                    buttons: [
                        {
                            title: '웹으로 보기',
                            link: {
                                mobileWebUrl: `${mobile_href}`,
                                webUrl: `${web_href}`,
                            },
                        },
                        {
                            title: '앱으로 보기',
                            link: {
                                mobileWebUrl: `${mobile_href}`,
                                webUrl: `${web_href}`,
                            },
                        },
                    ],
                });
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <button type="button" id={`${buttonId}`}>
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" alt="카카오톡 공유 보내기 버튼" />
        </button>
    )
}