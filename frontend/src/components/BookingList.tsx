'use client'
import Image from "next/image";
import Link from "next/link";
import { ReserveJson, Reservation } from "interfaces";
import dayjs, { Dayjs } from "dayjs";
import getReservation from "@/libs/getReservation";
import { useEffect } from "react";
import { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import MoreOptionMyReservation from "./MoreOptionMyReservation";
import { pink } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function BookingList ({session}:{session:any}) {
    const [showOptions, setShowOptions] = useState(false);
    
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

    return (
        <div>
            <div className="text-[#363062] flex flex-col items-center justify-center my-10 mr-[20%]">
            <div className="font-semibold text-5xl m-10">Your Reservations</div>

            { (reservations && reservations.count > 0) ?
            (
                reservations.data.map((reserve:Reservation) => (
                    <div className="bg-white mb-10 rounded-lg w-[77%] h-[200px] relative flex flex-row shadow-lg" key={reserve._id}>
                            <div className="h-full w-[30%] relative rounded-lg">
                                <Image src={reserve.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-l-lg"/>
                            </div>
                            <div className="flex flex-col ">
                                <div className="flex flex-row text-4xl font-semibold underline relative left-7 top-2"> {reserve.hotel.name}</div>
                                <div className="text-lg m-2 relative left-6 top-1 font-medium">
                                    <div>User: {reserve.user.name}</div>
                                    <div>Reservation Date: {dayjs(reserve.revDate).format("YYYY/MM/DD")}</div>
                                    <div>Total Night: {reserve.nightNum}</div>
                                </div>
                            </div>
                        
                            
                            {/* {reserve.status === 'unpaid'&& (
                            <Link  href={`/reservations/${reserve._id}?hid=${reserve.hotel.id}&name=${reserve.hotel.name}`}>
                            <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#F99417] absolute h-[40px] w-[80px] right-[100px] top-2"
                            >Edit</button></Link> )}
                            {reserve.status === 'unpaid'&& (
                            <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-red-600 absolute h-[40px] w-[80px] right-4 top-2"
                            onClick={()=>{deleteReservations(session.user.token, reserve._id)}}>Delete</button>)}
                            */}

                            {reserve.status === 'unpaid'&& (
                                <div>
                                    <div className="text-[#CC382E] text-md absolute right-12 top-6">
                                        <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                        unpaid
                                    </div>
                                    <MoreOptionMyReservation reserve={reserve} session={session}/>
                                    <Link href={`/payment/${reserve._id}`}>
                                    <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-green-600 absolute h-[40px] w-[80px] right-4 bottom-3"
                                    onClick={() => {}}>Pay</button>
                                    </Link>
                                </div>
                            )}
                            {reserve.status === 'pending'&& (
                                <div className="text-[#F99417] text-md absolute right-8 top-2">
                                    <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                    pending...
                                </div>
                            )}
                            {reserve.status === 'reserved'&&(
                                <div>
                                <div className="text-[#1EB012] text-md absolute right-8  top-2">
                                <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                reserved
                                </div>
                                <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#CC382E] absolute h-[40px] w-[80px] right-4 bottom-3"
                                onClick={() => { alert("GO PAY") }}>Cancel</button>
                                </div>
                            )}
                            {reserve.status === 'completed'&&(
                                <div>
                                    <div className="text-[#339CFC] text-md absolute right-8  top-2">
                                    <CircleIcon sx={{ fontSize: 8 }} className="mx-1"/>
                                    completed
                                    </div>
                                    <Link href={`/review?hid=${reserve.hotel.id}&name=${reserve.hotel.name}`}>
                                    <button className="px-3 py-1 text-white shadow-sm rounded-xl bg-[#339CFC] absolute h-[40px] w-[80px] right-4 bottom-3"
                                    >Review</button>
                                    </Link>
                                </div>
                            )}
                    </div>
                ))
            )
            :(<div className="absolute inset-0 flex justify-center items-center text-gray-500 mr-[20%]">No reservation</div>)
            }
            </div>





        </div>
    )
}







