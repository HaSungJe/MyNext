import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

type MonthPickerProps = {
    search_date: string;
    setFunction: Function
}

export default function MonthPicker( {search_date, setFunction}: MonthPickerProps ) {
    const [selectedDate, setSelectedDate] = useState<Date | string | null>(null);
    const handleDateChange = (selectData: Date) => {
        setSelectedDate(selectData);
        if (typeof selectData === 'string') {
            setFunction(selectData);
        } else {
            const year = selectData.getFullYear();
            const month = selectData.getMonth() + 1;
            setFunction(`${year}-${month < 10 ? '0' + month : month}`);
        }
    };

    useEffect(() => {
        if (search_date) {
            setSelectedDate(search_date);
        }
    }, [search_date])

    const renderCustomHeader = ({ date, changeYear, changeMonth }: any) => (
        <>
            <select key={`monthpicker_year`} value={getYear(date)} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
                {
                    Array.from({ length: 100 }, (_, i) => i + 1950).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))
                }
            </select>

            <select key={`monthpicker_month`} value={getMonth(date)} onChange={({ target: { value } }) => changeMonth(parseInt(value))}>
                {
                    Array.from({ length: 12 }, (_, i) => i).map(month => (
                        <option key={month} value={month}>{month + 1}</option>
                    ))
                }
            </select>
        </>
    );

    return (
        <DatePicker
            selected={typeof selectedDate === 'string' ? new Date(selectedDate) : selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            renderCustomHeader={renderCustomHeader}
            className="text"
            locale={ko}
        />
    );
};