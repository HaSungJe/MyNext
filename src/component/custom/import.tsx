"use client";
import { useEffect } from "react";
import $ from 'jquery';

export default function Import() {
    const scripts = [
        '/js/comm.js'
    ]

    useEffect(() => {
        (window as any).$ = $;
        (window as any).jQuery = $;

        for (let i=0; i<scripts.length; i++) {
            const script = document.createElement("script");
            script.src = scripts[i];
            script.async = true;
            document.body.appendChild(script);
        }
    }, [])

    return (
        <>
        </>
    )
}