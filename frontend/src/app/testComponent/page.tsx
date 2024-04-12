// 'use client'

// import { useState } from "react"
// import ReviewTags from "@/components/ReviewTags";
// import User from "@/components/User";
import getReviews from "@/libs/getReview";
import { Tags } from "interfaces";

export default async function testComponent(){
    const mockTags:Tags = {
        service:false,
        food:false,
        convinience:false,
        cleanliness:false,
        facility:false,
        worthiness:false,
        stars: null
    }
    const reviews = getReviews(mockTags)
    const reviewsReady = await reviews
    console.log(reviewsReady)

    return (
        <main>
            Review
        </main>
    )

    // const [cleanliness,setCleanliness] = useState(false);
    // const [convinience,setConvinience] = useState(false);
    // const [facility,setFacility] = useState(false);
    // const [food,setFood] = useState(false);
    // const [service,setService] = useState(false);
    // const [worthiness,setWorthiness] = useState(false);

    // return(
    //     <main>
    //         <div>
    //         <div className="flex flex-row-reverse w-1/2 ">
    //             <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
    //             <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
    //             <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
    //             <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
    //             <ReviewTags tagsName="Service" value={service} isUse={setService}/>
    //             <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
    //         </div>
    //         <div className="flex flex-row-reverse">
    //             <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convinience} ${cleanliness}` }</h1>
    //         </div>
    //         </div>  
            
    //     </main>
        
    // )
}