'use client';
import $ from 'jquery';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        $("#btn2").on("click", () => {
            alert("jquery test2222222")
        });
    }, [])

    return (
        <>
            <button type="button" id="btn">jquery test</button>
            <button type="button" id="btn2">jquery test</button>
        </>
    )
}