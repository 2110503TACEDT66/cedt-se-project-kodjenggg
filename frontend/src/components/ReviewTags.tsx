
export default function ReviewTags({tagsName, value, isUse}: {tagsName:string, value:boolean, isUse:Function}){

    return(
        <div className="justify-center">
            {
                value?
                <button className=" mr-2 px-3 py-1 text-sm text-white rounded-lg bg-[#F99417] h-[30px] border-2 border-[#F99417] w-[110px] top-2 
                hover:bg-white hover:text-[#F99417]"
                onClick={()=>{isUse(!value)}}>
                {tagsName}</button>
                :<button className="mr-2 px-3 py-1 text-sm text-[#F99417] rounded-lg bg-white h-[30px] border-2 border-[#F99417] w-[110px] top-2 
                hover:bg-[#F99417] hover:text-white"
                onClick={()=>{isUse(!value)}}>
                {tagsName}</button>
            }
        </div>
    )

}