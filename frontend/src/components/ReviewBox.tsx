'use client'

import { useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import { RatingStar } from "./RatingStar";
import { Rating } from '@mui/material';
import { read } from "fs";
import { ReviewItem } from "interfaces";
import { useSession } from "next-auth/react";
import addReview from "@/libs/addReview"

export default function ReviewBox(){

    const { data: session } = useSession();

    const [cleanliness,setCleanliness] = useState(false);
    const [convinience,setConvinience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");


    async function createReview(){
        console.log({cleanliness,convinience,facility,food,service,worthiness,rating,title,comment});
        console.log(session?.user._id);
        if(session){
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
        }
    }

    return(
        <main className="h-fit w-[100%] bg-slate-100">
            <div className="h-[250px] w-[80%] rounded-xl mx-auto bg-white shadow-sm relative p-5 mb-[20px]"> 
                <div className="h-[20%]">
                    <div>
                        <div className="text-[#4D4C7D] text-lg italic">{session?.user.name}</div>
                        <Rating className="w-full h-[10%]" value={(rating==undefined)? 0:rating}
                        onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}/>
                    </div>
                    <div className="flex flex-row-reverse w-[65%] absolute top-5 right-5">
                        <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                        <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
                        <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                        <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                        <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                        <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                    </div>
                </div>
                <div className="h-[80%]">
                <div className="relative bg-gray-200 w-full h-[25%] top-4 flex items-center justify-start rounded-md hover:shadow-md">
                    <input
                        placeholder="add a title..."
                        className="relative bg-gray-200 rounded-md w-[90%] left-2 placeholder:text-[#4D4C7D]
                        focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] font-bold overflow-"
                        onChange={(data) => setTitle(data.target.value)}
                    />
                    </div>
                    <hr className="border-solid border-[#F99417] w-full mt-6 border-[1.5px]" />
                    <textarea
                        placeholder="add a comment..."
                        className="relative bg-gray-200 rounded-md w-full h-[60%] top-2 placeholder:text-[#4D4C7D] minRows={3}
                        focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] pl-2 pt-1"
                        onChange={(data) => setComment(data.target.value)}
                    />
                </div>
            </div>
            <div className="w-fit mx-auto">
                <button className="bg-[#363062] px-3 py-1 text-white text-md rounded-lg"
                onClick={()=>createReview()}>Submit</button>
            </div>
        </main>
    );
}