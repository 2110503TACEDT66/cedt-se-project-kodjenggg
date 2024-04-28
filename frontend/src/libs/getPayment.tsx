import { resolve } from "path"

export default async function getPayment(reservid:string) {
    const response = await fetch(`http://localhost:5000/api/v1/payment/${reservid}`)
    if(!response.ok){
        //console.log(response.json);
        console.log(reservid)
        throw new Error ('Failed to fetch payment')
    }
    return await response.json()
}