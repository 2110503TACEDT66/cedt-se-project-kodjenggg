import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSession } from "next-auth/react";

export default function MoreOption({userid} : {userid:string}){
    const { data: session } = useSession();

    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        // Handle edit action
        console.log('Edit clicked');
    };

    const handleDelete = () => {
        // Handle delete action
        console.log('Delete clicked');
    };

    if(userid === session?.user._id || session?.user.role === 'admin')
    return(
        <div className="text-slate-400 w-fit absolute top-[22px] right-5">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col absolute rounded-xl">
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-3 rounded-t-xl" onClick={handleEdit}>Report</button>
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2" onClick={handleEdit}>Edit</button>
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-2 rounded-b-xl" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );

    return(
        <div className="text-slate-400 w-fit absolute top-[22px] right-5">
            <button onClick={toggleOptions}><MoreVertIcon/></button>
            {showOptions && (
                <div className="flex flex-col absolute rounded-xl">
                <button className="bg-white text-black text-sm hover:bg-slate-100 p-3 rounded-xl" onClick={handleEdit}>Report</button>
                </div>
            )}
        </div>
    );
}