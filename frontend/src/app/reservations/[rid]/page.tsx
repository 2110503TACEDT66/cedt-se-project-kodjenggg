'use client'
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ReservationItem } from "interfaces";
import { TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import updateReservation from "@/libs/updateReservation";
import { useRouter } from "next/navigation";
export default function Reservations({params}:{params:{rid:string}}){

    const urlParams = useSearchParams()
    const hid = urlParams.get('hid')
    const name = urlParams.get('name')

    const router = useRouter()

    const { data: session } = useSession();

    
    const editReservation = async() => {
        console.log(params.rid)
        if(params.rid && hid && revDate && nightNum && session?.user?.token){
            const item:ReservationItem = {
                hotelId: hid,
                revDate: dayjs(revDate).format("YYYY/MM/DD"),
                nightNum: nightNum
            }
            const response = await updateReservation(session?.user?.token, params.rid, item)
            console.log(response)
            router.push('/mybooking')
        }
    }
    
    

    const [revDate, setRevDate] = useState<Dayjs|null>(null)
    const [nightNum, setnightNum] = useState<number>(1)

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-4xl font-bold mt-10 underline text-[#363062]">{name}</div>
            <div className="text-2xl italic font-medium text-[#4D4C7D]">Edit Reservation</div>
            <div className="w-1/3 space-y-10">
                <div>
                    <div className="text-xl font-bold text-left text-[#363062]">
                    Pick your check-in date :
                    </div>
                    <DateReserve onDateChange={(value:Dayjs)=>{setRevDate(value)}}/>
                </div>
                
                <div className="text-xl mt-[20px] font-bold text-left text-[#363062] items-end justify-start align-middle">
                    <div className="mb-[12px]">Number of nights : </div>
                    <TextField id="nightNum" name="nightNum" type="number"
                    label="(Minimun 1 night, Maximum 3 nights)" variant="outlined" 
                    className="h-fit p-2 w-[100%] focus:border-[#363062]"
                    value={nightNum} onChange={(e)=>{
                        var num = Number(e.currentTarget.value)
                        if(num<1){num = 1;}
                        else if(num>3){num = 3;}
                        setnightNum(num)}}/>
                </div>

                <div>
                    <div className="text-md underline text-left text-[#363062]">Reservation Summary</div>
                    <div className="text-md text-left text-[#363062]">
                        Hotel : {name} <br/>
                        User's name : {session?.user?.name}  <br/>
                        Reservation date (check-in date) : {dayjs(revDate).format("YYYY/MM/DD")} <br/>
                        Number of nights : {nightNum} <br/>
                    </div>
                </div>
                <button className='w-[100%] bg-[#F99417] text-white border-2 border-[#F99417] font-semibold py-2  mt-5 rounded
                hover:bg-white hover:text-[#F99417]'
                onClick={editReservation}>
                Edit this reservation
                </button>
            </div>
            
        </main>
    );
}