'use client'
import Image from "next/image";
import Link from "next/link";
import { ReserveJson,ReviewJson, ReviewItem, Reservation } from "interfaces";
import dayjs, { Dayjs } from "dayjs";
import getReservation from "@/libs/getReservation";
import ReviewTags from "./ReviewTags";
import { useEffect, useState } from "react"
import User from "@/components/User";
import getReviews from "@/libs/getReview";
import ReviewComponent from "@/components/ReviewComponent";
import { Tags } from "interfaces";


export default function ReviewCard({tags}:{tags:Tags}){

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
        <main>
            <div>
        {reviews && reviews.data.map((review: ReviewItem) => (
            <div className="h-[250px] w-[80%] rounded-2xl mx-auto bg-white shadow-lg relative p-5 mb-[20px] my-10">
            <div className="bg-[#FFFFFF] text-[#F99417]">
                {`stars: ${review.stars}`}


                <div className = "flex flex-row-reverse absolute top-3 right-3">
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

            <div className="text-[#363062] font-semibold text-4xl">
            {review.title}
            </div>

            <div className="flex justify-center items-center my-2">
            <hr className="flex justify-center items-center border-solid border-[#F99417] w-[90%] border-[1.0px]" />
            </div>

            {review.comment}
                
            </div>
            </div>

        ))}
        

    </div>
    </main>
);
}