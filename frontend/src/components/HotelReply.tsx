'use client'

import { useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import { RatingStar } from "./RatingStar";
import { Rating } from '@mui/material';
import { read } from "fs";
import { ReviewItem } from "interfaces";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview"

export default function HotelReply(){

    const { data: session } = useSession();
    const [reply, setReply] = useState("");

    //const [cleanliness,setCleanliness] = useState(false);
    //const [convinience,setConvinience] = useState(false);
    //const [facility,setFacility] = useState(false);
    //const [food,setFood] = useState(false);
    //const [service,setService] = useState(false);
    //const [worthiness,setWorthiness] = useState(false);
    //const [ rating, setRating ] = useState(0);
    //const [title, setTitle] = useState("");
    //const [comment, setComment] = useState("");
    //var tagCheck:Boolean|undefined = cleanliness||convinience||facility||food||service||worthiness;


    async function createReview(){
        //console.log({cleanliness,convinience,facility,food,service,worthiness,rating,title,comment});
        console.log(session?.user._id);
        /*if(session && title && comment){
            const item:ReviewItem = {
                hotelid: "6600e809f52ff909aed4c203",
                stars: rating,
                comment: comment,
                title: title,
                userid: session?.user?._id,
                report: 0,
                service: service,
                food: food,
                convinience: convinience,
                cleanliness: cleanliness,
                worthiness: worthiness,
                reply:{
                    userreply:"",
                    reply:"",
                    date : new Date(Date.now())
                }
            }
            const response = await addReview(session?.user?.token,item);
        }*/
    }

    return(
        <main className="h-fit w-[100%] bg-[#4D4C7D] flex justify-center">
                
            <div className="h-[200px] w-[80%] relative">
                <div className="ml-[10%] my-3"> 
                    <h1 className="text-white text-sm italic font-extralight">Reply to username</h1>
                </div>
                <form action="">
                <div className="h-[150px] w-[90%] rounded-xl absolute right-0 bg-gray shadow-sm p-5 bg-[#D9D9D9]"> 
                
                
                    <div className="h-[80%]">
                        <h1 className="text-black text-sm italic font-extralight">Hotelname</h1>
                        <textarea
                            placeholder="add a reply..."
                            className="relative bg-gray-200 rounded-md w-full h-[90%] top-2 placeholder:text-[#4D4C7D] minRows={3} hover:shadow
                            focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] text-sm pl-2 pt-1"
                            onChange={(data) => setReply(data.target.value)}
                            required
                        />
                        <button className="absolute right-5 top-20 bg-[#363062] px-2 py-1 text-white text-sm rounded-lg m-2 
                        hover:bg-[#4D4C7D]
                        shadow-md shadow-indigo-500/50"
                        disabled={!reply}
                        onClick={()=>//createReview()
                        }>Submit</button>
                        
                    </div>
                </div>
            </form>
            </div>
            
        </main>
    );
}

