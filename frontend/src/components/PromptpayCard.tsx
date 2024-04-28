'use client'
import Image from "next/image";
import InteractiveCard from './InteractiveCard'
import React, { useEffect, useState } from 'react';
import router from "next/router";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import { ReserveOneJson } from "interfaces";
import getUserProfile from "@/libs/getUserProfile";

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
    //   console.log(profile)

    return(
        <main>
            {
            (profile && reserveDetail) ? 
            <div>
            <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-3 py-6 mx-auto mt-30 w-[37%] bg-white">
            <h1 className="text-center mb-4 text-3xl font-bold mt-3" style={{ textDecoration: 'underline' }}>Promptpay QR code</h1>
            <div className="text-3xl text-center text-[#F99417] font-bold mt-7">2,000 Baht</div> 
            {/* mock data */}


            <div className="text-center mb-4 text-xl text-[#B5B5B5] mt-7"> Scan to pay</div>
            </div>


            <div className="w-[100%] flex justify-center left-0 mt-10 ">
            <button className="bg-[#FFA940] py-1 mr-3 text-[#363062] text-lg font-semibold rounded-lg w-[10%] mr-12"
            //  onClick={()=>{router.push(/payment)}}
            >Back</button>

            <button className="bg-[#339CFC] py-1 mr-3 text-[#363062] font-semibold text-lg rounded-lg w-[10%] ml-12"
            onClick={() => { router.push(`${reserveDetail.data._id}/mobilebanking/insertslip`); }}
            

            >Continue</button>

            </div>

            </div>
            : 
            <div> Loading </div>
            }
        
        </main>

    )
}