'use client'
import React, { useState } from "react";
import updateReport from "@/libs/updateReport";
import { useSession } from "next-auth/react";

export default function ReportPopup({params}:{params:{rid:string}}) {

  const [isVisible, setIsVisible] = useState(true);
  const { data: session } = useSession();

  const editReport = async() => {
    const selectedRadio = document.querySelector('input[name="report"]:checked');
    if (!selectedRadio) {
      alert("Please select a reason for the report.");
      return;
    }
    if(session?.user?.token){
      const response = await updateReport(session?.user?.token,"6616b92d5c86f2516dd88099" );
      console.log(response);
      setIsVisible(false);
       // Hide the component
    }
  };

  return (
    <>
    {isVisible && (
      <div>
        <div className="text-[#363062] border border-gray-300 rounded-3xl shadow-xl px-3 py-6 mx-auto mt-20 w-[37%]">
          <h1 className="text-center mb-4 text-2xl" style={{ textDecoration: 'underline' }}>Report</h1>
          <div className="flex flex-col items-start justify-start relative top-6">
            <div className="radio-row p-[20px]">
              <input type="radio" name="report" id="option1" value="option1" />
              <label htmlFor="option1" className="pl-[7px]">Contain unwanted commercial content or spam</label>
            </div>
            <div className="radio-row p-[20px]">
              <input type="radio" name="report" id="option2" value="option2" />
              <label htmlFor="option2" className="pl-[7px]">Content that is obscene or sexually explicit</label>
            </div>
            <div className="radio-row p-[20px]">
              <input type="radio" name="report" id="option3" value="option3" />
              <label htmlFor="option3" className="pl-[7px]">Content that contain hate speech or violence</label>
            </div>
            <div className="radio-row p-[20px]">
              <input type="radio" name="report" id="option4" value="option4" />
              <label htmlFor="option4" className="pl-[7px]">Contain threat or bullying text</label>
            </div>
            <div className="radio-row p-[20px] mb-8">
              <input type="radio" name="report" id="option5" value="option5" />
              <label htmlFor="option5" className="pl-[7px]">Providing incorrect information</label>
            </div>
          </div>
          <div className="text-[#363062] flex justify-end space-x-6 mt-8 mr-5">
            <button onClick={()=>setIsVisible(false)}>Cancel</button>
            <button onClick={editReport}>Report</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
