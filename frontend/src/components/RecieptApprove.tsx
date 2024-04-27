
import getOneReservation from "@/libs/getOneReservation"
import { Reservation } from "interfaces"
import { useEffect, useState } from "react"

export default async function RecieptApprove({session}:{session:any}){

    const ReservationDetail= await getOneReservation(session.user.token, '661ad32dc15463157a95156a');

    console.log(ReservationDetail);
    console.log(ReservationDetail.data.revDate.substring(0,10))

    return (
        <main className="w-[75%] flex flex-col items-center">
            <div className="text-[#363062] text-[30px] font-extrabold text-center underline decortion-[#363062] underline-offset-[4px] my-[20px]">Payment Confirmation</div>
            <div className="flex flex-row w-[80%] mx-auto h-[480px] shadow-xl">
                <div className="w-[40%] h-[100%] rounded-l-md text-black">
                    photo
                </div>
                <div className="w-[60%] bg-[#4D4C7D] h-[100%] rounded-r-md py-10 px-10 flex flex-col justify-around relative">
                    <div className="italic text-[20px] flex">User : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{ReservationDetail.data.user.name}</div></div>
                    <div className="italic text-[20px] flex">Hotel : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{ReservationDetail.data.hotel.name}</div></div>
                    <div className="italic text-[20px] flex">Room Type : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">Exclusive Room</div></div>
                    <div className="italic text-[20px] flex">Reservation Date : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{ReservationDetail.data.revDate.substring(0,10)}</div></div>
                    <div className="italic text-[20px] flex">Total Night : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{ReservationDetail.data.nightNum}</div></div>
                    <div className="italic text-[20px] flex">Total Deposit : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic"> 2,000 THB</div></div>
                    <div className="italic text-[20px] flex">Payment Date : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">23 April 2024</div></div>
                    <div className="italic text-[20px] flex">Payment Time : <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">22:40</div></div>
                </div>
            </div>
            <div className="m-5">
                <button className="bg-[#CC382E] p-3 rounded-xl w-[150px] font-semibold mr-8 text-xl">Disapprove</button>
                <button className="bg-[#1EB012] p-3 rounded-xl w-[150px] font-semibold ml-8 text-xl">Approve</button>
            </div>
        </main>
    );
}