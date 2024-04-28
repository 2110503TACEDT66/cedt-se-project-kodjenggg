'use client'

import { useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import { RatingStar } from "./RatingStar";
import { Rating } from '@mui/material';
import { ReviewItem } from "interfaces";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Dayjs } from "dayjs";
import DateReservenoBG from "./DateReservenoBG";

export default function InsertSlipBox(){

    const { data: session } = useSession();
    const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<any>();
    const [revDate, setRevDate] = useState<Dayjs|null>(null)

    return(
        <main>
            {/* header from NOW */}

            <div className="bg-[#4D4C7D] mb-10 rounded-lg w-[77%] h-[200px] relative flex flex-row shadow-lg justify-center items-center">
            <div className="flex flex-col">
            <div className="text-lg m-2 relative left-6 top-1 font-normal">
                {profile && (
                    <div>User: {profile.data.name}</div>
                )}
                {reserveDetail && (
                    <div>
                        <div>Hotel: {reserveDetail.data.hotel.name}</div>
                        <div>Room Type: {}</div>
                        <div>Reservation date: {dayjs(reserveDetail.data.revDate).format("YYYY/MM/DD")}</div>
                        <div>Total nights: {reserveDetail.data.nightNum}</div>
                        <div>Total payment: {}</div>
                    </div>
                )}
                </div>
            </div>
                
                <div className="h-full w-[30%] relative rounded-lg">
                    {reserveDetail && (
                    <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-l-lg"/>
                    )} 
                </div>              
            </div>

            {/* grey card content */}
            <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-3 py-6 mx-auto mt-30 w-[77%] bg-[#D9D9D9]">
                <div className="justify-center">
                <div className="text-xl text-[#363062] mt-3 mb-2" style={{ fontStyle: 'italic' }}>Payment Date:</div>
                <DateReservenoBG onDateChange={(value:Dayjs)=>{setRevDate(value)}}/>
                
                <div className="w-[100%] flex justify-left mt-6">
                    <div className="w-[50%]">
                        <div className="justify-left mb-4 text-xl text-[#363062] w-[100%]" style={{ fontStyle: 'italic' }}> Total:</div>
                        <input type="text" className="rounded-md px-3 py-3 w-[90%]" placeholder="0.00" />
                    </div>

                    <div className="w-[50%]">
                        <div className="justify-left mb-4 text-xl text-[#363062] w-[100%]" style={{ fontStyle: 'italic' }}> Time:</div>
                        <input type="text" className="rounded-md px-5 py-3 w-[90%]" placeholder="--:--" />
                    </div>
                </div>
                </div>
            </div>
            {/* end of grey card content */}

        </main>
    )
    
}