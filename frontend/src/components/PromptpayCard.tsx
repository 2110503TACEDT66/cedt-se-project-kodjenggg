'use client'
import Image from "next/image";
import InteractiveCard from './InteractiveCard'
import React from 'react';
import router from "next/router";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation, ReserveOneJson, PaymentJson } from "interfaces";

export default function PromptpayCard({reserve}: {reserve:string}){
    const router = useRouter();
    const { data:session } = useSession()
    const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<ReserveOneJson>();

    useEffect(() => {
        const fetchData = async () => {
          if(session && session.user.token){
            try {
              console.log('lol');
              const userProfile = await getUserProfile(session.user.token);
              setProfile(userProfile);

              const revJson:Promise<ReserveOneJson> = await getOneReservation(reserve,session.user.token);
              const revReady:ReserveOneJson = await revJson;
              setReserveDetails(revReady);
              
            } catch (error) {
              console.error("Error fetching data:", error);
            }

          }
        };
    
        fetchData();
      }, []);

    return(
        <main>
            {
            (profile && reserveDetail) ?
          <div>
            <div className="w-[80vw] h-[80vh] px-3 py-6 mx-auto mt-30 flex flex-col justify-center bg-white border border-gray-300 rounded-3xl shadow-xl ">
              <div className="w-full">
                <h1 className="text-[#363062] text-center mb-4 text-3xl font-bold mt-3" style={{ textDecoration: 'underline' }}>Promptpay QR code</h1>
                <div className=" text-3xl text-center text-[#F99417] font-bold mt-7">{reserveDetail.data.totalPrice} Baht</div> 
              </div>
              
              <div className="ml-[10%] h-[60%] w-[80%] relative ">
                <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-lg"/>
              </div>

              <div className="text-center mb-4 text-xl text-[#B5B5B5] mt-7"> Scan to pay</div>
            

              <div className="w-[100%] flex justify-center left-0 ">
              <button className="bg-[#FFA940] py-1 text-[#363062] text-lg font-semibold rounded-lg w-[10%] px-12"
              //  onClick={()=>{router.push(/payment)}}
              >Back</button>

              <button className="bg-[#339CFC] py-1 text-[#363062] font-semibold text-lg rounded-lg w-[10%] px-12"
              onClick={() => { router.push('/mybooking'); }}
              >Continue</button>

              </div>
            </div>

            
          </div>
        :
        <div className="w-full text-center flex justify-center m-5 items-center text-gray-500 text-md ">Loading...</div>
        }
        </main>

    )
}