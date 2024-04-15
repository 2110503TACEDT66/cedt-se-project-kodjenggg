'use client'

import { useState } from "react"
import SearchTags from "@/components/SearchTags";

import { Tags } from "interfaces";
import { Select, MenuItem, colors } from "@mui/material";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ReviewCard from "./ReviewCard";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    color: 'white',
    background: '#F99417',
    '& .MuiInputBase-input': {
      borderRadius: 4,
      border: '2px solid #F99417',
    '&:focus': {
        borderRadius: 4,
        borderColor: '#F99417',
      },
    },
}));

export default function ReviewPanel({hid}:{hid:string}){

    const [cleanliness,setCleanliness] = useState(false);
    const [convenience,setConvenience] = useState(false);
    const [facility,setFacility] = useState(false);
    const [food,setFood] = useState(false);
    const [service,setService] = useState(false);
    const [worthiness,setWorthiness] = useState(false);
    const [stars,setStars] = useState<string>("0")

    const reviewTags:Tags = {
        service:service,
        food:food,
        convenience:convenience,
        cleanliness:cleanliness,
        facility:facility,
        worthiness:worthiness,
        stars: stars==="0"? null : parseInt(stars)
    }

    return(
        <main>
            <div className="w-full bg-[#4D4C7D] p-5">
            <h1 className="text-4xl font-medium relative text-center text-white pt-20 pb-10 italic">Reviews</h1>

            <div className=" w-full flex flex-col justify-center self-center content-center items-center my-2">
                <hr className="flex justify-center items-center w-[70%] border-solid border-[#908EA5] border-[0.5px]" />
                <p className="ml-[15%] text-sm text-[#908EA5] self-start mt-2 p-1">View reviews by :</p>
            </div>
            
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-2 w-[70%] place-content-center">
                    <SearchTags tagsName="Cleanliness" value={cleanliness} isUse={setCleanliness}/>
                    <SearchTags tagsName="Convenience" value={convenience} isUse={setConvenience}/>
                    <SearchTags tagsName="Facility" value={facility} isUse={setFacility}/>
                    <SearchTags tagsName="Food" value={food} isUse={setFood}/>
                    <SearchTags tagsName="Service" value={service} isUse={setService}/>
                    <SearchTags tagsName="Worthiness" value={worthiness} isUse={setWorthiness}/>
                    
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="text-md text-center flex flex-row space-x-4 w-[70%] items-center justify-items-center justify-center h-[50px]">
                    <Select name="stars" id="stars" className="h-[2em] w-full text-[#F99417] border-[#F99417] justify-items-center"
                    input={<BootstrapInput />}
                    value={stars} onChange={(e)=>{setStars(e.target.value)}}>
                        <MenuItem value="0">All stars</MenuItem>
                        <MenuItem value="5">5 Stars</MenuItem>
                        <MenuItem value="4">4 Stars</MenuItem>
                        <MenuItem value="3">3 Stars</MenuItem>
                        <MenuItem value="2">2 Stars</MenuItem>
                        <MenuItem value="1">1 Stars</MenuItem>
                    </Select>
                </div>   
            </div>
            <div className="flex justify-center items-center my-4">
            <hr className="flex justify-center items-center border-solid border-[#908EA5] w-[70%] border-[0.5px]" />
            </div>
                {/* <div >
                    <h1 className="text-black"> {`${worthiness} ${service} ${food} ${facility} ${convenience} ${cleanliness}` }</h1>
                </div> */}
            <ReviewCard tags={reviewTags} hid={hid}/>
            </div>  
            
        </main>
        
    )
}