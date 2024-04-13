'use client'

import { useEffect, useState } from "react"
import ReviewTags from "@/components/ReviewTags";
import User from "@/components/User";
import ReviewComponent from "@/components/ReviewComponent";
import { Tags } from "interfaces";
import ReviewTagsPurple from "@/components/ReviewTagsPurple";

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
            <div className="font-thin text-sm text-slate-200 ml-[12%] ">View reviews by :</div>
            <div className="flex justify-center w-full my-5">
            <div className="flex justify-center flex-row-reverse w-1/2 my-2">
                <ReviewTagsPurple tagsName="Food" value={food} isUse={setFood}/>
                <ReviewTagsPurple tagsName="Service" value={service} isUse={setService}/>
                <ReviewTagsPurple tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
            </div>
            </div>


            <div className="flex justify-center w-full my-2">
            <div className="flex justify-center flex-row-reverse w-1/2">
            <ReviewTagsPurple tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                <ReviewTagsPurple tagsName="Convenience" value={convenience} isUse={setConvenience}/>
                <ReviewTagsPurple tagsName="Facility" value={facility} isUse={setFacility}/>
            </div>
            </div>

            <div className="flex flex-row-reverse">
                <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convenience} ${cleanliness}` }</h1>
            </div>
            <ReviewComponent tags={reviewTags} />
            </div>  
            
        </main>
        
    )
}