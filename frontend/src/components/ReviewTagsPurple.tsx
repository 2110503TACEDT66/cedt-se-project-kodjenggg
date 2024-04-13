'use client'
export default function ReviewTagsPurple({tagsName, value, isUse}: {tagsName:string, value:boolean, isUse:Function}){

    return(
        <div className="justify-center w-fit mx-[2px]">
            {
                value?
                <button className="bg-[#363062] px-12 py-1 rounded-lg text-white border-[#363062] border-4 mx-7 w-50 h-10 text-center hover:bg-white hover:text-[#363062]"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
                :<button className="bg-white px-12 py-1 rounded-lg text-[#363062] border-[#363062] border-4 mx-7 w-50 h-10 text-center hover:bg-[#363062] hover:text-white"
                onClick={(e)=>{isUse(!value); e.preventDefault(); e.stopPropagation()}}>
                {tagsName}</button>
            }
        </div>
    )

}