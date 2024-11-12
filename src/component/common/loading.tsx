import { ClipLoader } from 'react-spinners';

/**
 * 로딩 페이지
 * @returns 
 */

type LoadingProps = {
    size?: number;
    height?: number;
}

export default function Loading({size, height}: LoadingProps) {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${height ? height : 100}vh`}}>
            <ClipLoader size={size ? size : 150} color={"#123abc"} loading={true} />
        </div>    
    )
}