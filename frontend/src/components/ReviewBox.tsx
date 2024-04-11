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
        <div className="h-[250px] w-[80%] rounded-xl mx-auto bg-white shadow-sm relative p-5"> 
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

        </div>
    );
}