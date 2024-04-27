'use client'
import Image from "next/image";
import InteractiveCard from './InteractiveCard'
import React from 'react';
import router from "next/router";
import { useRouter } from "next/navigation";

export default function PromptpayCard(){
    const router = useRouter();

    return(
        <main>
        <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-3 py-6 mx-auto mt-30 w-[37%] bg-white">
            <h1 className="text-center mb-4 text-3xl font-bold mt-3" style={{ textDecoration: 'underline' }}>Promptpay QR code</h1>
            <div className="text-3xl text-center text-[#F99417] font-bold mt-7">2,000 Baht</div> 
            {/* mock data */}


            <div className="text-center mb-4 text-xl text-[#B5B5B5] mt-7"> Scan to pay</div>
        </div>


        <div className="w-[100%] flex justify-center left-0 mt-10 ">
        <button className="bg-[#FFA940] py-1 mr-3 text-[#363062] text-lg font-semibold rounded-lg w-[10%] mr-12"
        //  onClick={()=>{router.push(/payment/${hid})}}
        >Back</button>

        <button className="bg-[#339CFC] py-1 mr-3 text-[#363062] font-semibold text-lg rounded-lg w-[10%] ml-12"
        onClick={() => { router.push('/mybooking'); }}

        >Continue</button>

        </div>
        </main>

    )
}