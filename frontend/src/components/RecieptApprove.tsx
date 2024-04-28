import { useEffect, useState } from "react";
import getPayment from "@/libs/getPayment";
import getUserProfile from "@/libs/getUserProfile";

export default async function RecieptApprove({ session }: { session: any }) {
    const PaymentReady = await getPayment("662de72c534e33d8602344e1");
    console.log(PaymentReady);

    const payTime = PaymentReady.data.paytime;
    const payTimeDate = new Date(payTime);
    payTimeDate.setHours(payTimeDate.getHours() + 7);
    const payTimePlus7Hours = payTimeDate.toISOString().substring(11, 19);

    const profile = await getUserProfile(session.user.token);
    console.log(profile?.data?.role)

    return (
        <div className="flex justify-center items-center">
            {profile?.data?.role === "hotelmanager" ? (
                <main className="w-[65%]  flex flex-col items-center justify-center">
                    <div className="text-[#363062] text-[30px] font-extrabold text-center underline decortion-[#363062] underline-offset-[4px] my-[20px]">Payment Confirmation</div>
                    <div className="flex flex-row w-[80%] mx-auto h-[410px] shadow-xl">
                        <div className="w-auto h-auto rounded-l-md text-black overflow-hidden">
                            <img src={PaymentReady.data.image} className="h-[100%]" alt="Hotel" />
                        </div>
                        <div className="w-[60%] bg-[#4D4C7D] h-[100%] rounded-r-md py-10 px-10 flex flex-col justify-around relative">
                            <div className="italic text-[20px] flex">User: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.user.name}</div></div>
                            <div className="italic text-[20px] flex">Hotel: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.hotel.name}</div></div>
                            <div className="italic text-[20px] flex">Room Type: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.room.roomtype}</div></div>
                            <div className="italic text-[20px] flex">Reservation Date: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.revDate.substring(0, 10)}</div></div>
                            <div className="italic text-[20px] flex">Total Night: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.nightNum}</div></div>
                            <div className="italic text-[20px] flex">Total Deposit: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.reservid.totalPrice}</div></div>
                            <div className="italic text-[20px] flex">Payment Date: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{PaymentReady.data.paytime.substring(0, 10)}</div></div>
                            <div className="italic text-[20px] flex">Payment Time: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payTimePlus7Hours}</div></div>
                        </div>
                    </div>
                    <div className="m-5">
                        <button className="bg-[#CC382E] p-3 rounded-xl w-[150px] font-semibold mr-8 text-xl">Disapprove</button>
                        <button className="bg-[#1EB012] p-3 rounded-xl w-[150px] font-semibold ml-8 text-xl">Approve</button>
                    </div>
                </main>
            ) : (
                <main>
                    <div className="text-gray-600 flex h-screen flex-col justify-center items-center">
                        You are not authorized to access this page
                    </div>
                </main>
            )}
        </div>
    );
}
