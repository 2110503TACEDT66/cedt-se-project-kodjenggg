'use client'
import { ReviewJson, ReviewItem, Reservation } from "interfaces";
import { useEffect, useRef, useState } from "react"
import getReviews from "@/libs/getReview";
import { Tags } from "interfaces";
import { Rating } from "@mui/material";
import MoreOption from "./MoreOption";


export default function ReviewCard({tags,hid}:{tags:Tags,hid:string}){

    async function data() {
        await new Promise((resolve) => setTimeout(resolve,500))
        const reviewsJson:Promise<ReviewJson> = getReviews(tags,hid);
        const reviewsReady:ReviewJson = await reviewsJson;
        setReviews(reviewsReady)
    }

    const [reviews, setReviews] = useState<ReviewJson>()
    
    useEffect(() => {
        data()
    }, [tags]);

    return(
        <main>
        <div>
        {reviews && reviews.data.map((review: ReviewItem) => (
            <div className="h-[250px] w-[70%] rounded-2xl mx-auto bg-white shadow-lg relative p-10 mb-[20px] my-10">
                <div className="bg-[#FFFFFF] text-[#F99417]">
                    <Rating name="read-only" value={review.stars} readOnly />
                    <div className = "flex flex-row-reverse absolute top-5 right-10">
                        {review.service && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                service
                            </button>
                        )}

                        {review.food && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                food
                            </button>
                        )}

                        {review.convenience && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                convenience
                            </button>
                        )}

                        {review.cleanliness && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                cleanliness
                            </button>
                        )}

                        {review.facility && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                facility
                            </button>
                        )}

                        {review.worthiness && (
                            <button className="px-3 py-1 text-sm text-[#F99417] rounded-lg bg-[white] h-[30px] border-2 border-[#F99417] w-fit text-center mx-1 ">
                                worthiness
                            </button>
                        )}
                </div>
                <div className="text-[#363062] font-semibold text-4xl">{review.title}</div>

                <div className="flex justify-center items-center my-2">
                    <hr className="flex justify-center items-center border-solid border-[#F99417] w-[95%] border-[1.0px]" />
                </div>
                {review.comment}
                </div>
                <MoreOption/>
            </div>

        ))}
        

    </div>
    
    </main>
);
}