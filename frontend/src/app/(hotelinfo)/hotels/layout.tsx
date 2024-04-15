import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";

export default function ReservationLayout({children}: {children: React.ReactNode}){
    return(     
        <div>
            {children}
        </div>
    )
}