import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function ReservationLayout({children}: {children: React.ReactNode}){
    return(
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        <div>
        {children}
        </div>
        </Suspense>     
       
    )
}