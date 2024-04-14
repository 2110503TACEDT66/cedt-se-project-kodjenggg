'use client'
import { ReviewJson, ShowReviewItem, Reservation } from "interfaces";
import { useEffect, useState } from "react"
import getReviews from "@/libs/getReview";
import { Tags } from "interfaces";
import { Rating } from "@mui/material";


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
            <div className="flex flex-col justify-around">
        {reviews && reviews.data.map((review: ShowReviewItem) => (
            <div className="mb-[0px]">
            
            <div className="h-fit w-[70%] rounded-2xl mx-auto bg-white shadow-lg relative p-10 mb-[0px] my-10">
            <div className="bg-[#FFFFFF] text-[#F99417] p-1">
                <p className="text-md text-[#F99417] italic">{`${review.userid.name}`}</p>
                <Rating name="read-only" value={review.stars} readOnly />
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

            <div className="text-[#363062] font-semibold text-4xl text-wrap">
            {review.title}
            </div>

            <div className="flex justify-center items-center my-2">
            <hr className="flex justify-center items-center border-solid border-[#F99417] w-[100%] border-[1.0px]" />
            </div>
            <div className="text-[#363062] text-lg text-wrap">
                {review.comment}
            </div>
            </div>
        </div>
        
        <div className="h-fit w-full bg-[#4D4C7D] flex justify-center mb-0">
            <div className="h-fit w-[70%] relative">
                <div className="absolute top-2 left-2">
                    <h1 style={{ fontSize: '3vw' }}>↳</h1>
                </div>
                <div className="ml-10 my-1">
                    <h1 className="text-white text-sm italic font-extralight">
                        Reply to {review.userid.name}
                    </h1>
                </div>
                <div className="h-fit w-[92%] rounded-xl absolute right-0 bg-gray shadow-sm p-5 bg-[#D9D9D9] text-wrap">
                    <h1 className="text-black text-sm italic font-extralight">
                    Hotelname
                    </h1>
                    <h1 className="text-[#363062] text-lg">
                    {review.comment}nf vnfu yghj vgjggg ggjhhvvh klho ooo oooo oovh vhdn
                    </h1>  
                </div>
            </div>
        </div>
            
     

        </div>
        ))}
        

    </div>
    </main>
);
}