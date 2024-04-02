'use client'
import Image from "next/image";
import Link from "next/link";
import { ReserveJson, Reservation } from "interfaces";
import dayjs, { Dayjs } from "dayjs";
import getReservation from "@/libs/getReservation";
import { useEffect } from "react";
import { useState } from "react";

import deleteReservation from "@/libs/deleteReservation";


export default function BookingList ({session}:{session:any}) {

    async function data() {
        await new Promise((resolve) => setTimeout(resolve,500))
        const reserveJson:Promise<ReserveJson> = await getReservation(session.user.token)
        const reserveJsonReady:ReserveJson = await reserveJson
        setReservations(reserveJsonReady)
    }

    const [reservations, setReservations] = useState<ReserveJson>()
    
    useEffect(() => {
        data()
      }, []);

    async function deleteReservations(token:string, rid:string){
        if(token && rid){
            await deleteReservation(token , rid)
            data()
        }
    }

    return (
        <div>
            <div className="text-[#363062] flex flex-col items-center justify-center my-10 mr-[20%]">
            <div className="font-semibold text-5xl m-10">Your Reservations</div>
                
            { (reservations && reservations.count > 0) ? 
            (
                reservations.data.map((reserve:Reservation) => (
                    <div className="bg-slate-200 mb-10 rounded-lg w-[77%] h-[150px] relative flex flex-row shadow-lg" key={reserve._id}>
                            <div className="h-full w-[30%] relative rounded-lg">
                                <Image src={reserve.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-l-lg"/>                   
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row text-4xl font-semibold underline relative left-7 top-2"> {reserve.hotel.name}</div>
                                <div className="text-lg m-2 relative left-6 top-2 font-medium">
                                    <div>User: {reserve.user.name}</div>
                                    <div>Reservation Date: {dayjs(reserve.revDate).format("YYYY/MM/DD")}</div>
                                    <div>Total Night: {reserve.nightNum}</div>
                                </div>
                            </div>
                            <Link  href={`/reservations/${reserve._id}?hid=${reserve.hotel.id}&name=${reserve.hotel.name}`}>
                            <button className="px-3 py-1 text-white shadow-sm rounded-lg bg-[#F99417] absolute h-[40px] w-[80px] right-[14%] top-2" 
                            >Edit</button></Link>
                        
                            <button className="px-3 py-1 text-white shadow-sm rounded-lg bg-red-600 absolute h-[40px] w-[80px] right-[2%] top-2"
                            onClick={()=>{deleteReservations(session.user.token, reserve._id)}}>Delete</button>
                            
                    </div>
                ))
            )
            :(<div className="absolute inset-0 flex justify-center items-center text-gray-500 mr-[20%]">No reservation</div>)
            }
            </div> 


             


        </div>
    )
}

    
    
    
    
    
    
