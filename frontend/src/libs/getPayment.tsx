import { resolve } from "path"

export default async function getPayment(id:string) {
    const response = await fetch(`http://localhost:5000/api/v1/payments/${id}`)
    if(!response.ok){
        console.log(response.json);
        throw new Error ('Failed to fetch payment')
    }
    return await response.json()
}