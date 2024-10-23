'use client';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { axiosErrorHandle } from "@/util/util";
import { axiosGet } from "@/util/axios";
import moment from 'moment';
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