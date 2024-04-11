import BookingList from "@/components/BookingList";
import User from "@/components/User";
import getReservation from "@/libs/getReservation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import AddReview from "@/components/AddReview";

export default async function review(){
    const sessionReady = await getServerSession(authOptions) ;
    if ( !sessionReady || !sessionReady.user.token) return null

    return(
        <main >
            <AddReview/>
            <User/>
        </main>
    )
}