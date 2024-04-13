'use client'
import { ReviewItem, ReviewJson, Tags } from "interfaces";
import getReviews from "@/libs/getReview";
import { useEffect, useState } from "react";

export default function ReviewComponent({tags}:{tags:Tags}){
    async function data() {
        await new Promise((resolve) => setTimeout(resolve,500))
        const reviewsJson:Promise<ReviewJson> = getReviews(tags);
        const reviewsReady:ReviewJson = await reviewsJson;
        setReviews(reviewsReady)
    }

    const [reviews, setReviews] = useState<ReviewJson>()
    
    useEffect(() => {
        data()
    }, [tags]);

    return(
        <div className="flex flex-col">
            {   reviews?
                reviews.data.map((review:ReviewItem)=>(
                    <div className="bg-[#FFFFFF] text-black">
                        {`stars: ${review.stars}
                          title: ${review.title}
                          comment: ${review.comment}
                          food: ${review.food}
                          worthiness: ${review.worthiness}`
                          }
                    </div>
                )):""
            }
        </div>
    )
} 