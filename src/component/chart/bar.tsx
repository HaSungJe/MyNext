'use client';
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { colors } from './colors'; 

type ChartProps = {
    horizontal: boolean;
    showLabel: boolean;
    labels: Array<string | number>;
    series: Array<SeriesProps>
    x_title: string;
    y_title: string;
    width: string;
    height: string;
}

type SeriesProps = {
    name: string;
    data: Array<number>
}

export default function BarChart( {horizontal, showLabel, labels, series, x_title, y_title, width, height}: ChartProps ) {
    const horizontal_T_show_label = horizontal === true ? showLabel : true;
    const horizontal_F_show_label = horizontal === false ? showLabel : true;

    const options: ApexOptions = {
        chart: {
            id: x_title || '',
        },
        plotOptions: {
            bar: {
                horizontal: horizontal,
                distributed: true
            }
        },
        colors: colors,
        xaxis: {
            categories: labels,
            title: {
                text: x_title || ''
            },
            labels: {
                show: horizontal_F_show_label
            }
        },
        yaxis: {
            title: {
                text: y_title || ''
            },
            labels: {
                show: horizontal_T_show_label
            }
        }
    };

    return <Chart options={options} series={series} type="bar" width={width} height={height}/>;
}