'use client'

import { useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import { RatingStar } from "./RatingStar";
import { Rating } from '@mui/material';

export default function ReviewBox(){

    const [cleanliness,setCleanliness] = useState(false);
    const [convinience,setConvinience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [ rating, setRating ] = useState(0)

    return(
        <main className="h-fit w-[100%] bg-slate-100">
            <div className="h-[250px] w-[80%] rounded-xl mx-auto bg-white shadow-sm relative p-5 mb-[20px]"> 
                <Rating className="w-full h-[10%]" value={(rating==undefined)? 0:rating}
                onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}/>

                <div className="flex flex-row-reverse w-[65%] absolute top-5 right-5">
                    <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                    <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
                    <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                    <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                    <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                    <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                </div>
                <div className="h-[80%]">
                <div className="relative bg-gray-200 w-full h-[25%] top-4 flex items-center justify-start rounded-md">
                    <input
                        type="text"
                        placeholder="add a title..."
                        className="relative bg-gray-200 rounded-md w-[90%] left-2 placeholder:text-[#4D4C7D]"
                    />
                    </div>
                    <hr className="border-solid border-[#F99417] w-full mt-6 border-[1px]" />
                    <div className="relative bg-gray-200 w-full h-[60%] flex items-start justify-start rounded-md top-2">
                    <input
                        type="text"
                        placeholder="add a comment..."
                        className="relative bg-gray-200 rounded-md w-[90%] left-2 placeholder:text-[#4D4C7D]"
                    />
                    </div>
                </div>
            </div>
            <div className="w-fit mx-auto">
                <button className="bg-[#363062] px-3 py-1 text-white text-md rounded-lg">Submit</button>
            </div>
        </main>
    );
}