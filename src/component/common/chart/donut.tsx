'use client'
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { colors } from './colors';

type ChartProps = {
    title: string;
    centerText: string;
    labels: Array<string>;
    series: Array<SeriesProps>
    width: string;
    height: string;
    fontSize: string;
    legendShow: boolean
}

type SeriesProps = {
    name: string;
    data: Array<number>
}

export default function DonutChart( {title, centerText, labels, series, width, height, fontSize, legendShow}: ChartProps ) {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        colors,
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: centerText,
                            fontSize: fontSize,
                            color: "#000",
                            formatter: () => ''
                        }
                    }
                }
            }
        },
        legend: {
            show: legendShow
        },
        title: {
            text: title,
            align: 'center',
            margin: 10,
            offsetY: 0,
            style: {
                fontSize: fontSize,
                color: '#000'
            }
        }
    };

    return <Chart options={options} series={series} type="donut" width={width} height={height} />;
}