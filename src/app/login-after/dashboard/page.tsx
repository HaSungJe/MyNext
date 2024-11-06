'use client';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { axiosErrorHandle } from "@/util/util";
import Loading from "@/component/loading";
import { useRouter } from "next/navigation";
const DonutChart = dynamic(() => import('@component/chart/donut'), { ssr: false });
const LineChart = dynamic(() => import('@component/chart/line'), { ssr: false });
const BarChart = dynamic(() => import('@component/chart/bar'), { ssr: false });

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(false);
        }

        fetch();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <>
                대시보드
            </>
        )
    }
}