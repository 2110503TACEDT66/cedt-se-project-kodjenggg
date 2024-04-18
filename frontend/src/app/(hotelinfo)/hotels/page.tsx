// import CarPanel from "@/components/CarPanel"
import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import ReduxProvider from "@/redux/ReduxProvider"

export default function Hotel(){
    const hotels = getHotels()
    return(
        <ReduxProvider>
        <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
        <main className="text-center p-5 mt-5">
            <h1 className="text-4xl font-medium text-[#363062]">Select Your Hotel</h1>
            <HotelCatalog hotelJson={hotels}/>
        </main>
        </Suspense>
        </ReduxProvider>
    )
}