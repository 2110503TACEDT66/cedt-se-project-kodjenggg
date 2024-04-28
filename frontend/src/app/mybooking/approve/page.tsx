import User from "@/components/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import RecieptApprove from "@/components/RecieptApprove";
import getPayment from "@/libs/getPayment";
export default async function ManageReservations(){
    const sessionReady = await getServerSession(authOptions) ;
    if ( !sessionReady || !sessionReady.user.token) return null


    return(
        <main>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <RecieptApprove session={sessionReady}/>
            </Suspense>
        </main>
    )
}