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
    const [chart1, setChart1Data] = useState( { labels: [], series: [] } );
    const [chart2Year, setChart2Year] = useState({ labels: [], series: [] });
    const [chart2Month, setChart2Month] = useState({ labels: [], series: [] });
    const [chart2Week, setChart2Week] = useState({ labels: [], series: [] });
    const [chart3A1, setChart3A1] = useState({ labels: [], series: [], text: '' });
    const [chart3A2, setChart3A2] = useState({ labels: [], series: [], text: '' });
    const [chart3B1, setChart3B1] = useState({ labels: [], series: [], text: '' });
    const [chart3B2, setChart3B2] = useState({ labels: [], series: [], text: '' });
    const [chart4Year, setChart4Year] = useState({ labels: [], series: [] });
    const [chart4Month, setChart4Month] = useState({ labels: [], series: [] });
    const [chart4Week, setChart4Week] = useState({ labels: [], series: [] });

    // 탭
    const [tab1, setTab1] = useState(1);
    const [tab2, setTab2] = useState(1);
    const [tab3, setTab3] = useState(1);
    function changeTab(location: number, tab: number) {
        if (location === 1) {
            setTab1(tab);
        } else if (location === 2) {
            setTab2(tab);
        } else if (location === 3) {
            setTab3(tab);
        }
    }

    // Chart 1
    async function getChart1() {
        try {
            const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
            const series = [
                {
                    name: '활동수',
                    data: [10, 25, 21, 17]
                }
            ]

            setChart1Data({labels: labels, series: series});
        } catch (error) {
            await axiosErrorHandle(error, router);
        }
    }

    // Chart 2
    async function getChart2() {
        try {
            // 1. 연간
            const yearLabels: Array<string> = [];
            const yearDatas: Array<number> = [];
            for (let i=1; i<=12; i++) {
                yearLabels.push(i + "월");
                yearDatas.push(Math.floor(Math.random() * 120000)); 
            }

            setChart2Year({labels: yearLabels, series: [{name: '방문수', data: yearDatas}]});

            // 2. 월간
            const monthLabels: Array<string> = [];
            const monthDatas: Array<number> = [];
            for (let i=1; i<31; i++) {
                monthLabels.push(i + "일");
                monthDatas.push(Math.floor(Math.random() * 3000)); 
            }
            setChart2Month({labels: monthLabels, series: [{name: '방문수', data: monthDatas}]});

            // 3. 주간
            const weekLabels: Array<string> = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const weekDatas: Array<number> = [];
            for (let i=0; i<7; i++) {
                weekDatas.push(Math.floor(Math.random() * 100)); 
            }
            setChart2Week({labels: weekLabels, series: [{name: '방문수', data: weekDatas}]});
        } catch (error) {
            await axiosErrorHandle(error, router);
        }
    }

    //  Chart 3 A
    async function getChart3A() {
        try {
            const ageLabels: Array<string> = ['A label', 'B Label', 'C label', 'D label', 'E label', '그외'];
            const ageDatas: Array<number> = [];
            for (let i=0; i<ageLabels.length; i++) {
                ageDatas.push(Math.floor(Math.random() * 1000)); 
            }
            setChart3A1({labels: ageLabels, series: ageDatas, text: `총 ${ageDatas.reduce((v, sum) => {return sum += v}, 0).toLocaleString()}`});

            const providerLabels: Array<string> = ['A label', 'B Label', 'C label', 'D label', 'E label', '그외'];
            const providerDatas: Array<number> = [];
            for (let i=0; i<providerLabels.length; i++) {
                providerDatas.push(Math.floor(Math.random() * 1000));
            }

            setChart3A2({labels: providerLabels, series: providerDatas, text: `총 ${providerDatas.reduce((v, sum) => {return sum += v}, 0).toLocaleString()}`});
        } catch (error) {
            await axiosErrorHandle(error, router);
        }

    }

    //  Chart 3 B
    async function getChart3B() {
        try {
            const ageLabels: Array<string> = ['A label', 'B Label', 'C label', 'D label', 'E label', '그외'];
            const ageDatas: Array<number> = [];
            for (let i=0; i<ageLabels.length; i++) {
                ageDatas.push(Math.floor(Math.random() * 1000));
            }
            setChart3B1({labels: ageLabels, series: ageDatas, text: `총 ${ageDatas.reduce((v, sum) => {return sum += v}, 0).toLocaleString()}`});

            const hospitalLabels: Array<string> = ['A label', 'B Label', 'C label', 'D label', 'E label', '그외'];
            const hospitalDatas: Array<number> = [];
            for (let i=0; i<hospitalLabels.length; i++) {
                hospitalDatas.push(Math.floor(Math.random() * 1000));
            }

            setChart3B2({labels: hospitalLabels, series: hospitalDatas, text: `총 ${hospitalDatas.reduce((v, sum) => {return sum += v}, 0).toLocaleString()}`});
        } catch (error) {
            await axiosErrorHandle(error, router);
        }
    }

    // Chart 4
    async function getChart4() {
        try {
            // 1. 연간
            const yearLabels: Array<string> = [];
            const yearDatas: Array<number> = [];
            for (let i=1; i<=12; i++) {
                yearLabels.push(i + "월");
                yearDatas.push(Math.floor(Math.random() * 120000)); 
            }
            setChart4Year({labels: yearLabels, series: [{name: '댓글수', data: yearDatas}]});

            // 2. 월간
            const monthLabels: Array<string> = [];
            const monthDatas: Array<number> = [];
            for (let i=1; i<31; i++) {
                monthLabels.push(i + "일");
                monthDatas.push(Math.floor(Math.random() * 3000)); 
            }
            setChart4Month({labels: monthLabels, series: [{name: '댓글수', data: monthDatas}]});

            // 3. 주간
            const weekLabels: Array<string> = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const weekDatas: Array<number> = [];
            for (let i=0; i<7; i++) {
                weekDatas.push(Math.floor(Math.random() * 100)); 
            }
            setChart4Week({labels: weekLabels, series: [{name: '댓글수', data: weekDatas}]});
        } catch (error) {
            await axiosErrorHandle(error, router);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getChart1();
            await getChart2();
            await getChart3A();
            await getChart3B();
            await getChart4();

            
            setLoading(false);
        }

        fetch();
    }, [])

    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                            <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                        </svg>
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$53k</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong className="text-green-500">+55%</strong>&nbsp;than last week
                        </p>
                    </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Users</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">2,300</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong className="text-green-500">+3%</strong>&nbsp;than last month
                        </p>
                    </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                        </svg>
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">New Clients</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">3,462</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
                        </p>
                    </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                        </svg>
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Sales</p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$103,430</h4>
                    </div>
                    <div className="border-t border-blue-gray-50 p-4">
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong className="text-green-500">+5%</strong>&nbsp;than yesterday
                        </p>
                    </div>
                </div>
            </div>
        
            <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                        <div>
                            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">Projects</h6>
                            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                </svg>
                                <strong>30 done</strong> this month
                            </p>
                        </div>
                        <button aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">companies</p>
                                    </th>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">budget</p>
                                    </th>
                                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                                        <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">completion</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-4">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Material XD Version</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$14,000</p>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="w-10/12">
                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">60%</p>
                                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style={{width: '60%'}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-4">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Add Progress Track</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$3,000</p>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="w-10/12">
                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">10%</p>
                                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style={{width: '10%'}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-4">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Fix Platform Errors</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">Not set</p>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="w-10/12">
                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">100%</p>
                                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                <div className="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white" style={{width: '100%'}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-4">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Launch our Mobile App</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$20,500</p>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="w-10/12">
                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">100%</p>
                                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                <div className="flex justify-center items-center h-full bg-gradient-to-tr from-green-600 to-green-400 text-white" style={{width: '100%'}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-4">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Add the New Pricing Page</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">$500</p>
                                    </td>
                                    <td className="py-3 px-5 border-b border-blue-gray-50">
                                        <div className="w-10/12">
                                            <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">25%</p>
                                            <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm font-sans text-xs font-medium h-1">
                                                <div className="flex justify-center items-center h-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white" style={{width: '25%'}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )





    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div id="container">
                <div id="contents">
                    <div className="inner">
                        <div className="customcol-box mb20">
                            <div className="col-md-4">
                                <div className="card-top"><h3>Chart 1<span>Bar Chart</span></h3></div>
                                <div className="card-con">
                                    <BarChart key={`bar_${new Date().getTime()}_1`} horizontal={true} showLabel={false} labels={chart1['labels']} series={chart1['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-top tap-card-add">
                                    <h3>Chart 2<span>Line Chart</span></h3>
                                    <ul className="tabs-">
                                        <li className={ tab2 === 1 ? 'active-' : '' } onClick={() => changeTab(2, 1)}>주간</li>
                                        <li className={ tab2 === 2 ? 'active-' : '' } onClick={() => changeTab(2, 2)}>월간</li>
                                        <li className={ tab2 === 3 ? 'active-' : '' } onClick={() => changeTab(2, 3)}>연간</li>
                                    </ul>
                                </div>
                                <div className="card-con">
                                    {
                                        tab2 === 1 ?
                                        (
                                            <LineChart key={`line_${new Date().getTime()}_1`} labels={chart2Week['labels']} series={chart2Week['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                        )
                                        :
                                        (
                                            tab2 === 2 ?
                                            (
                                                <LineChart key={`line_${new Date().getTime()}_2`} labels={chart2Month['labels']} series={chart2Month['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                            )
                                            :
                                            (
                                                <LineChart key={`line_${new Date().getTime()}_3`} labels={chart2Year['labels']} series={chart2Year['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="customcol-box mb20"> 
                            <div className="col-md-4">
                                <div className="card-top tap-card-add">
                                    <h3>Chart 3<span> statistics</span></h3>
                                    <ul className="tabs">
                                        <li className={ tab1 === 1 ? 'active' : '' }  onClick={() => changeTab(1, 1)}>A Type</li>
                                        <li className={ tab1 === 2 ? 'active' : '' }  onClick={() => changeTab(1, 2)}>B Type</li>
                                    </ul>
                                </div>                                
                                <div className="card-con card-con-reset">
                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content" style={{display: "flex", justifyContent: 'space-between', flex: 1, margin: '0 10px', minWidth: '10px'}}>
                                            {
                                               tab1 === 1 ? 
                                                (
                                                    <>
                                                        <DonutChart key={`donut_${new Date().getTime()}_1`} title={'A1'} centerText={chart3A1['text']} labels={chart3A1['labels']} series={chart3A1['series']} width={'250px'} height={'auto'} fontSize={'12px'} legendShow={false}/>
                                                        <DonutChart key={`donut_${new Date().getTime()}_2`} title={'A2'} centerText={chart3A2['text']} labels={chart3A2['labels']} series={chart3A2['series']} width={'250px'} height={'auto'} fontSize={'12px'} legendShow={false}/> 
                                                    </>
                                                )
                                               : 
                                                (
                                                    <>
                                                        <DonutChart key={`donut_${new Date().getTime()}_3`} title={'B1'} centerText={chart3B1['text']} labels={chart3B1['labels']} series={chart3B1['series']} width={'250px'} height={'auto'} fontSize={'12px'} legendShow={false}/>
                                                        <DonutChart key={`donut_${new Date().getTime()}_4`} title={'B2'} centerText={chart3B2['text']} labels={chart3B2['labels']} series={chart3B2['series']} width={'250px'} height={'auto'} fontSize={'12px'} legendShow={false}/>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="card-top tap-card-add">
                                    <h3>댓글통계<span>Comment statistics</span></h3>
                                    <ul className="tabs-">
                                        <li className={ tab3 === 1 ? 'active-' : '' } onClick={() => changeTab(3, 1)}>주간</li>
                                        <li className={ tab3 === 2 ? 'active-' : '' } onClick={() => changeTab(3, 2)}>월간</li>
                                        <li className={ tab3 === 3 ? 'active-' : '' } onClick={() => changeTab(3, 3)}>연간</li>
                                    </ul>
                                </div>
                                <div className="card-con">
                                    {
                                        tab3 === 1 ?
                                        (
                                            <LineChart key={`line_${new Date().getTime()}_4`} labels={chart4Week['labels']} series={chart4Week['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                        )
                                        :
                                        (
                                            tab3 === 2 ?
                                            (
                                                <LineChart key={`line_${new Date().getTime()}_5`} labels={chart4Month['labels']} series={chart4Month['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                            )
                                            :
                                            (
                                                <LineChart key={`line_${new Date().getTime()}_6`} labels={chart4Year['labels']} series={chart4Year['series']} x_title={''} y_title={''} width={'100%'} height={'247px'}/>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}