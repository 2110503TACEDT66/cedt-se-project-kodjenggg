'use client'
import { ReviewJson, ShowReviewItem, Reservation } from "interfaces";
import { useEffect, useState } from "react"
import getReviews from "@/libs/getReview";
import { Tags } from "interfaces";
import { Rating } from "@mui/material";
import getHotel from "@/libs/getHotel";
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { profile } from "console";
import { useSession } from "next-auth/react";


export default function ReviewCard({tags,hid}:{tags:Tags,hid:string}){

    const [reviews, setReviews] = useState<ReviewJson>();
    const [hotelDetail, setHotelDetail] = useState<any>();
    const [profile, setProfile] = useState<any>();
    const {data:session} = useSession();

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!session || !session.user.token) return null;
          const userProfile = await getUserProfile(session.user.token);
          setProfile(userProfile);

          const [reviewsJson, hotelDetailData] = await Promise.all([
            getReviews(tags, hid),
            getHotel(hid),
          ]);
          setReviews(reviewsJson);
          setHotelDetail(hotelDetailData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [tags, hid]);

    return(
        
        <main>
            
            <div className="flex flex-col justify-around">
        {reviews && reviews.data.map((review: ShowReviewItem) => (
            <div className="mb-[0px]">
            
            <div className="h-fit w-[70%] rounded-2xl mx-auto bg-white shadow-lg relative px-7 pt-10 pb-4 mt-10">
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
            { profile.data.role=='hotelmanager' && profile.data.hotel.id==hid && (!review.reply.userreply || !review.reply.reply )?
                (<button className="px-7 py-1 mt-3 text-sm text-[#8F8F8F] rounded-lg bg-[white] h-[30px] border-2 border-[#8F8F8F] w-fit text-center mx-1 ">Reply</button>)
                :null
            }
            { profile.data._id == review.userid._id ? ( 
                <div className="flex justify-end"> 
                <button className="text-center mr-2 p-[4px] text-white shadow-sm rounded-lg bg-[#F99417] h-[30px] w-[55px] text-xs" 
                >Edit</button>
                <button className="text-center p-[4px] text-white shadow-sm rounded-lg bg-red-600 h-[30px] w-[55px] text-xs"
                onClick={()=>{}}>Delete</button>
                </div>
             ):null
            }
            </div>
        </div>
        
        {review.reply.userreply && review.reply.reply ? 
        (<div className="h-full w-full flex justify-center mt-2"> 
            <div className="w-[70%] relative">
                <div className="absolute top-1 left-2">
                    <h1 style={{ fontSize: '3vw' }}>↳</h1>
                </div>
                <div className=" w-[92%] ml-[8%] my-1">
                    <h1 className="text-white text-sm italic font-extralight">
                        Reply to {review.userid.name}
                    </h1>
                </div>
                <div className="w-[92%] ml-[8%] rounded-xl bg-[#E9E9E9] shadow-sm p-3 bg-[#D9D9D9] text-wrap">
                    <h1 className="text-[#4D4C7D] text-sm italic font-extralight">
                    {hotelDetail.data.name}
                    </h1>
                    <h1 className="text-[#363062] text-lg">
                    {review.reply.reply}
                    </h1>
                    { profile.data.role=='hotelmanager' && profile.data.hotel.id==hid ?
                    (<div className="flex justify-end"> 
                    <button className="text-center mr-2 p-[4px] text-white shadow-sm rounded-lg bg-[#F99417] h-[30px] w-[55px] text-xs" 
                    >Edit</button>
                    <button className="text-center p-[4px] text-white shadow-sm rounded-lg bg-red-600 h-[30px] w-[55px] text-xs"
                    onClick={()=>{}}>Delete</button>
                    </div>):null}
 
                </div>
                
            </div>
        </div>)
        :null}
     

        </div>
        ))}
        

    </div>
    </main>
);
}
