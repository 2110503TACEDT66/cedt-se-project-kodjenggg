import { ReservationItem } from "interfaces"

export default async function createReservation(token: string,reserveItem: ReservationItem) {
    const response = await fetch(`http://localhost:5000/api/v1/hotels/${reserveItem.hotelId}/reservations/`,{
        method : "POST",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            revDate: reserveItem.revDate,
            nightNum: reserveItem.nightNum,
            status: 'unpaid'
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to create reservation")
    }
    return await response.json()
}