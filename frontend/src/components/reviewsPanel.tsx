'use client'

import { useEffect, useState } from "react"
import ReviewTags from "./ReviewTags";
import { Tags } from "interfaces";
import getReviews from "@/libs/getReview";

export default function ReviewsPanel(){
    const [cleanliness,setCleanliness] = useState(false);
    const [convinience,setConvinience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [reviews,setReviews] = useState(null)

    const tags:Tags = {
        service:service,
        food:food,
        convinience:convinience,
        cleanliness:cleanliness,
        facility:facility,
        worthiness:worthiness,
        stars: null
    }  

    useEffect(()=>{
        async function searchTags() { 
            const search = await getReviews(tags)
            setReviews(search)
        }
        const search = searchTags()
        
    },[])

    if(!reviews) return (<p>Review Panel is Loading ...</p>)

    return(
        <div>
            <div className="flex flex-wrap w-1/2 ">
                <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
                <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
            </div>
            <div className="flex flex-row-reverse">
                <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convinience} ${cleanliness}` }</h1>
            </div>
            <div>
            {
                reviews.data.map((review:Object)=>(
                    
                ))
            }
            </div>
        </div>  
    )
}