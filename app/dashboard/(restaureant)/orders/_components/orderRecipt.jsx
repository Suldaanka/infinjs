import React from 'react'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function OrderRecipt({data}) {
    if (!data || !data.id) {
        return null; // or show fallback UI
      }
    console.log(data);
    const contentRef = useRef()
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
            <button onClick={reactToPrintFn}>Print</button>
            <div ref={contentRef} className='flex flex-col items-center'>
                <h1 className='text-center'>Iftin hotel</h1>
               <p> {data.id.slice(0.6)}</p>
               <p> {data.tableId || data.roomId}</p>
            </div>
        </div>
    )
}
