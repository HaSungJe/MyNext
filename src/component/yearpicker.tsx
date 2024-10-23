'use client';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

type YearPickerProps = {
    search_date: string;
    setFunction: Function
}

export default function YearPicker({ search_date, setFunction }: YearPickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
    const handleYearChange = (date: Date) => {
        setSelectedDate(date);
        setFunction(date.getFullYear().toString());
    };

    useEffect(() => {
        if (search_date) {
            setSelectedDate(search_date);
        }
    }, [search_date])

    return (
        <DatePicker
            selected={typeof selectedDate === 'string' ? new Date(selectedDate) : selectedDate}
            onChange={handleYearChange}
            showYearPicker
            dateFormat="yyyy"
            yearItemNumber={10} // 보이는 연도 수 조정
            className="text"
            locale={ko}
        />
    );
};