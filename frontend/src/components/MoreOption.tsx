import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";
import FlagIcon from '@mui/icons-material/Flag';
import EditReplyPopup from "./EditReplyPopUp";

export default function MoreOption({userid} : {userid:string}){
    const { data: session } = useSession();
    const [isVisible, setVisible] = useState(false);

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        setVisible(!isVisible);
        console.log('Edit clicked');
    };

    const handleDelete = () => {
        // Handle delete action
        console.log('Delete clicked');
    };
    
    const handleReport = () => {
        console.log('Report clicked');
    }


    if(userid === session?.user._id || session?.user.role === 'admin')
    return(
        <div>
        {isVisible ?(
        <div>
        <EditReplyPopup uid={userid}></EditReplyPopup>
        </div>
        ):null}
        <div className="text-slate-400 w-fit absolute top-[22px] right-5">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col absolute rounded-xl">
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-t-xl" onClick={handleEdit}>Edit</button>
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-b-xl" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
        </div>
    );

    return(
        <div className="text-red w-fit absolute top-[15px] right-4">
            <button className="bg-white text-slate-500 hover:text-red-500 rounded-xl" onClick={handleReport}><FlagIcon sx={{ fontSize: 35 }}/></button>
        </div>
    );
}