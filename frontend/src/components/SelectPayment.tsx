'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation } from "interfaces";

export default function SelectPayment({reserve}: {reserve:string}){
    
    const { data:session } = useSession()
    const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (session && session.user.token){
                console.log('lol');
              const userProfile = await getUserProfile(session.user.token);
              setProfile(userProfile);
            }
            if(session && session.user.token){
                const [revJson] = await Promise.all([
                    getOneReservation(reserve,session.user.token)
                  ]);
                  setReserveDetails(revJson);
            }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
      console.log('nowlhor')
      reserveDetail ?
      console.log(reserveDetail.data) : null
      console.log(profile)

    
    return (
        
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-4xl font-semibold text-[#4D4C7D] underline mt-7">Payment Information</div>
            <div className="text-3xl font-bold text-[#F99417] py-5">Your Deposit: XXXX Baht</div>
            
            <div className="bg-[#4D4C7D] mb-10 rounded-lg w-[77%] h-fit relative flex justify-between shadow-lg">
            <div className="flex flex-col">
            <div className="w-full">
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
            </div> 
            <div className="w-[35%] relative rounded-lg">
                {reserveDetail && (
                <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-r-lg"/>
                )} 
            </div>             
            </div>
            <div className="text-4xl font-semibold text-[#4D4C7D] mt-7 pt-5">Select Payment Method</div>
            <div className="text-xl font-light text-[#4D4C7D] mt-7 w-[70%] text-center">
            This payment will include just total of your deposit and you will have to proceed the rest of your payment at your hotel the day you stay. Thank you for you understanding. 
            </div>
            <div className="flex flex-row">
            <button className="block bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            >Credit/Debit Card</button>
            <button className="block bg-[#F99417] text-[#363062] text-xl font-bold border-2 border-[#F99417] px-6 py-2 mx-3 rounded hover:bg-white hover:text-[#F99417]"
            >Mobile Banking</button>
            </div>
        </main>
    )
}