import { ReservationItem } from "interfaces"

export default async function createCardPayment(token: string, reserveId : string) {
    const response = await fetch(`http://localhost:5000/api/v1/reservations/${reserveId}`,{
        method : "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })

    if(!response.ok){
        console.log(response)
        throw new Error("Failed to delete reservation")
    }
    return await response.json()
}