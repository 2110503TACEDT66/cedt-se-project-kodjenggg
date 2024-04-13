'use client'

import { useEffect, useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import User from "@/components/User";
import ReviewComponent from "@/components/ReviewComponent";
import { Tags } from "interfaces";

export default function testComponent(){
    // const mockTags:Tags = {
    //     service:false,
    //     food:false,
    //     convenience:false,
    //     cleanliness:false,
    //     facility:false,
    //     worthiness:false,
    //     stars: null
    // }
    // const reviews = getReviews(mockTags)
    // const reviewsReady = await reviews
    // console.log(reviewsReady)

    // return (
    //     <main>
    //         hello
    //     </main>
    // )

    const [cleanliness,setCleanliness] = useState(false);
    const [convenience,setConvenience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);

    const reviewTags:Tags = {
        service:service,
        food:food,
        convenience:convenience,
        cleanliness:cleanliness,
        facility:facility,
        worthiness:worthiness,
        stars: null
    }

    return(
        <main>
            <div>
            <div className="flex flex-row-reverse w-1/2 ">
                <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                <ReviewTags tagsName="Convenience" value={convenience} isUse={setConvenience}/>
                <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
            </div>
            <div className="flex flex-row-reverse">
                <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convenience} ${cleanliness}` }</h1>
            </div>
            <ReviewComponent tags={reviewTags} />
            </div>  
            
        </main>
        
    )
}