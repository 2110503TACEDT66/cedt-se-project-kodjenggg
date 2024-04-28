'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import getOneReservation from "@/libs/getOneReservation";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect } from "react";
import { useState } from "react";
import { ReserveJson, Reservation, ReserveOneJson } from "interfaces";
import router from "next/router";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import DateReservenoBG from "./DateReservenoBG";

export default function SelectPayment({reserve}: {reserve:string}){




    const [image , setImage ] = useState("") ;

    function convertToBase64(e: React.ChangeEvent<HTMLInputElement>) {
        var reader = new FileReader();
        if ( e.target.files ) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.onerror = (error) => {
          console.error("Error: ", error);
        };
      }
      function uploadImage() {
        fetch("http://localhost:5000/api/v1/payment", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
            reservid: reserve,
            image: image,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error uploading image:", error));
    }







    const router = useRouter();
    const { data:session } = useSession()
    const [profile, setProfile] = useState<any>();
    const [reserveDetail,setReserveDetails] = useState<ReserveOneJson>();
    const [revDate, setRevDate] = useState<Dayjs|null>(null);
    const [time , setTime ] = useState<Dayjs | null>(null) ;
    //const [deposit , setDeposit] = useState<>


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
        <main className="w-[100%] flex flex-col items-center space-y-4 mb-10">
        <div className="text-4xl font-semibold text-[#4D4C7D] underline mt-9 ">Payment Information</div>
            {/* header from NOW */}


            <div className="bg-[#4D4C7D] my-10 rounded-lg w-[77%] h-fit relative flex justify-between shadow-lg">
            <div className="flex flex-col">
            <div className="w-full">
            <div className="text-lg mx-2 my-4 relative left-6  font-normal">
                {profile && (
                    <div>User: {profile.data.name}</div>
                )}
                {reserveDetail && (
                    <div>
                        <div>Hotel: {reserveDetail.data.hotel.name}</div>
                        <div>Room Type: {reserveDetail.data.room.roomtype}</div>
                        <div>Reservation date: {dayjs(reserveDetail.data.revDate).format("YYYY/MM/DD")}</div>
                        <div>Total nights: {reserveDetail.data.nightNum}</div>
                        <div>Total payment: {reserveDetail.data.totalPrice}</div>
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

            {/* grey card content */}
            <div className="text-[#363062] justify-center border border-gray-300 rounded-3xl shadow-xl mx-auto mt-10 mb-20 w-[77%] bg-[#D9D9D9]">
                
                <div className="mx-5 px-6 py-4 ">
                <div className="text-xl mt-2 py-2 text-[#363062] rounded-lg " style={{ fontStyle: 'italic' }}>Payment Date:</div>
                <DateReservenoBG onDateChange={(value:Dayjs)=>{setRevDate(value)}}/>
                </div>
                
                <div className="w-[100%] flex flex-row justify-center">

                <div className="w-[90%] grid grid-cols-2 gap-4 justify-center ">
                    <div className="w-[100%] ">
                        <div className="justify-left text-xl text-[#363062] w-[10%] mb-2" style={{ fontStyle: 'italic' }}> Total:</div>
                        <input type="text" className="rounded-md px-3 py-3 w-[100%]" placeholder="0.00" />
                    </div>

                    <div className="w-[100%]">
                        <div className="justify-left text-xl text-[#363062] w-[10%] mb-2" style={{ fontStyle: 'italic' }}> Time:</div>
                        <input type="text" className="rounded-md px-5 py-3 w-[100%]" placeholder="--:--" />
                    </div>
              
                </div>
                </div>
                

           
                <div className="flex flex-col items-center">
                    <div>
                        <input className='w-[100%] bg-[#F99417] text-[#363062] border-2 border-[#F99417] font-bold py-2 px-5 mt-7 rounded-xl 
                            hover:bg-white hover:text-[#F99417]' accept='image/*' type="file" onChange={(e) => {convertToBase64(e)}}/>
                    </div>
                
                    <div className="mb-4">
                        <button className='w-[100%] bg-[#339CFC] text-[#363062] border-2 border-[#339CFC] font-bold py-1 px-5  mt-7 rounded-xl 
                            hover:bg-white hover:text-[#F99417]' onClick={() => {uploadImage()}}>
                            Submit
                        </button>
                    </div>
                </div>


            </div>
            {/* end of grey card content */}

        </main> 
    )
    
}