'use client'
export default function ReviewTags({tagsName, value, isUse}: {tagsName:string, value:boolean, isUse:Function}){

    return(
        <div className="justify-center w-1/6">
            {
                value?
                <button className="px-3 py-1 text-xs text-center text-white rounded-lg bg-[#F99417] h-[30px] border-2 border-[#F99417] w-[95%] top-2 
                hover:bg-white hover:text-[#F99417]"
                onClick={()=>{isUse(!value)}}>
                {tagsName}</button>
                :<button className=" px-3 py-1 text-xs text-center text-[#F99417] rounded-lg bg-white h-[30px] border-2 border-[#F99417] w-[95%] top-2 
                hover:bg-[#F99417] hover:text-white"
                onClick={()=>{isUse(!value)}}>
                {tagsName}</button>
            }
        </div>
    )

}