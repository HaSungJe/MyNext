'use client';
import $ from 'jquery';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        $("#btn").on("click", () => {
            alert("jquery test")
        });
    }, [])

    return (
        <>
            <button type="button" id="btn">jquery test</button>
        </>
    )
}