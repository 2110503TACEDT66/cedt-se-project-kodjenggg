// import CarPanel from "@/components/CarPanel"
import getHotels from "@/libs/getHotels"
import HotelCatalog from "@/components/HotelCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function Hotel(){
    const hotels = getHotels()
    return(
        <main className="text-center p-5 mt-5">
            <h1 className="text-4xl font-medium text-[#363062]">Select Your Hotel</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <HotelCatalog hotelJson={hotels}/>
            </Suspense>
        </main>
    )
}