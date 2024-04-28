'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import dayjs, { Dayjs } from "dayjs";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation } from "interfaces";
import router from "next/router";
import { useRouter } from "next/navigation";
import DateReservenoBG from "./DateReservenoBG";

export default function SelectPayment({reserve}: {reserve:string}){
    
    const router = useRouter();
    const { data:session } = useSession()
    const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<any>();
    const [revDate, setRevDate] = useState<Dayjs|null>(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (session && session.user.token){
                console.log('lol');
              const userProfile = await getUserProfile(session.user.token);
              setProfile(userProfile);
            }
            // if(session && session.user.token){
            //     const [revJson] = await Promise.all([
            //         getOneReservation(reserve,session.user.token)
            //       ]);
            //       setReserveDetails(revJson);
            // }
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    //   console.log('nowlhor')
    //   reserveDetail ?
    //   console.log(reserveDetail.data) : null
      console.log(profile)


    return(
        <main className="w-[100%] flex flex-col items-center space-y-4 mb-10">
        <div className="text-4xl font-semibold text-[#4D4C7D] underline mt-9 ">Payment Information</div>
            {/* header from NOW */}


            <div className="bg-[#4D4C7D] mb-10 rounded-lg w-[77%] h-[200px] relative flex flex-row shadow-lg ">
            <div className="flex flex-col">
            <div className="text-lg m-2 relative left-6 top-1 font-normal">
                {profile && (
                    <div>User: {profile.data.name}</div>
                )}
                {/* {reserveDetail && (
                    <div>
                        <div>Hotel: {reserveDetail.data.hotel.name}</div>
                        <div>Room Type: {reserveDetail.data.roomType}</div>
                        <div>Reservation date: {dayjs(reserveDetail.data.revDate).format("YYYY/MM/DD")}</div>
                        <div>Total nights: {reserveDetail.data.nightNum}</div>
                        <div>Total payment: {reserveDetail.data.totalPayment}</div>
                    </div>
                )} */}
                </div>
            </div>
                
                {/* <div className="h-full w-[30%] relative rounded-lg">
                    {reserveDetail && (
                    <Image src={reserveDetail.data.hotel.picture} alt='hosImg' fill={true} className="object-cover rounded-l-lg"/>
                    )} 
                </div>               */}
            </div>

            {/* grey card content */}
            <div className="text-[#363062] justify-center border border-gray-300 rounded-3xl shadow-xl mx-auto mt-10 mb-20 w-[77%] bg-[#D9D9D9]">
                
                <div className="mx-5 px-3 py-2">
                <div className="text-xl mt-2 py-2 text-[#363062] rounded-lg" style={{ fontStyle: 'italic' }}>Payment Date:</div>
                <DateReservenoBG onDateChange={(value:Dayjs)=>{setRevDate(value)}}/>
                </div>
                
                <div className="w-[100%] mx-5 px-3 py-2 flex justify-left ">
                    <div className="w-[50%]">
                        <div className="justify-left text-xl text-[#363062] w-[100%] mb-2" style={{ fontStyle: 'italic' }}> Total:</div>
                        <input type="text" className="rounded-md px-3 py-3 w-[90%]" placeholder="0.00" />
                    </div>

                    <div className="w-[50%]">
                        <div className="justify-left text-xl text-[#363062] w-[100%] mb-2" style={{ fontStyle: 'italic' }}> Time:</div>
                        <input type="text" className="rounded-md px-5 py-3 w-[90%]" placeholder="--:--" />
                    </div>
              
                </div>
                

           
                <div className="flex flex-col items-center">
                    <div>
                        <button className='w-[100%] bg-[#F99417] text-[#363062] border-2 border-[#F99417] font-bold py-2 px-5 mt-7 rounded-xl 
                            hover:bg-white hover:text-[#F99417]'>
                            Please attach a payment slip
                        </button>
                    </div>
                
                    <div className="mb-4">
                        <button className='w-[100%] bg-[#339CFC] text-[#363062] border-2 border-[#339CFC] font-bold py-1 px-5  mt-7 rounded-xl 
                            hover:bg-white hover:text-[#F99417]'>
                            Submit
                        </button>
                    </div>
                </div>


            </div>
            {/* end of grey card content */}

        </main> 
    )
    
}