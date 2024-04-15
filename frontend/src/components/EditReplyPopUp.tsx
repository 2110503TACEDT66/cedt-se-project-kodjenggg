'use client'
import React, { useState } from "react";
import updateReview from "@/libs/updateReview";
import { useSession } from "next-auth/react";
import { Rating } from '@mui/material';
import ReviewTags from "@/components/ReviewTags";

export default function EditReplyPopup({uid, cancel}:{uid:string, cancel:Function}) {

    const { data: session } = useSession();

    const [cleanliness,setCleanliness] = useState(false);
    const [convinience,setConvinience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [ rating, setRating ] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    var tagCheck:Boolean|undefined = cleanliness||convinience||facility||food||service||worthiness;

 
 

  const editReport = async() => {
    const selectedRadio = document.querySelector('input[name="report"]:checked');
    if (!selectedRadio) {
      alert("Please select a reason for the report.");
      return;
    }
    if(session?.user?.token){
     // const response = await updateReview(session?.user?.token,"6616b92d5c86f2516dd88099" );
     // console.log(response);
      
       // Hide the component
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-30 w-full h-full bg-slate-800/50 ">
      
      <div className="fixed top-[20%] left-[10%] right-[10%] h-fit w-[80%] z-40 overscroll-y-none">
      <div className="h-[100%] w-[100%] rounded-xl mx-auto bg-white shadow-sm relative p-5 mb-[20px]"> 
          <div className="h-[20%]">
              <div>
                  <div className="text-[#4D4C7D] text-lg italic">{session?.user.name}</div>
                  <Rating className="w-full h-[10%]" value={(rating==undefined)? 0:rating}
                  onChange={(e,newValue)=>{if(newValue!=null) setRating(newValue)}}/>
              </div>
              <div className="flex flex-row-reverse w-[65%] absolute top-5 right-5">
                  <ReviewTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                  <ReviewTags tagsName="Convinience" value={convinience} isUse={setConvinience}/>
                  <ReviewTags tagsName="Facility" value={facility} isUse={setFacility}/>
                  <ReviewTags tagsName="Food" value={food} isUse={setFood}/>
                  <ReviewTags tagsName="Service" value={service} isUse={setService}/>
                  <ReviewTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
              </div>
          </div>
          <div className="h-[80%]">
          <div className="relative bg-gray-200 w-full h-[25%] top-4 flex items-center justify-start rounded-md hover:shadow">
              <input
                  placeholder="add a title..."
                  className="relative bg-gray-200 rounded-md w-[90%] left-2 placeholder:text-[#4D4C7D]
                  focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] font-bold overflow-"
                  onChange={(data) => setTitle(data.target.value)}
                  required
              />
              </div>
              <hr className="border-solid border-[#F99417] w-full mt-6 border-[1.5px]" />
              <textarea
                  placeholder="add a comment..."
                  className="relative bg-gray-200 rounded-md w-full h-[60%] top-2 placeholder:text-[#4D4C7D] minRows={3} hover:shadow
                  focus:outline-none focus:ring-0 border border-transparent focus:border-gray-200 text-[#363062] pl-2 pt-1"
                  onChange={(data) => setComment(data.target.value)}
                  required
              />
          </div>
          <div className="w-[100%] flex justify-end left-0 mt-4 ">
          <button className="bg-[#363062] px-3 py-1 text-white text-md rounded-lg
          hover:bg-[#4D4C7D]
          disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          onChange={()=>{cancel(false)}}
          >Cancel</button>
          <button className="bg-[#363062] px-3 py-1 ml-2 text-white text-md rounded-lg
          hover:bg-[#4D4C7D]
          disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          disabled={!(cleanliness||convinience||facility||food||service||worthiness) || !rating || !title || !comment}
          >Edit</button>
          
        </div>
      </div>
      
      
    </div>
  
    </div>
  );
}
