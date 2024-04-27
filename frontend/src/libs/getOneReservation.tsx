export default async function getOneReservation(token: string, rid:string) {
    const response = await fetch (`http://localhost:5000/api/v1/reservations/${rid}`,{
        next: {tags: ['reservations']},
        cache: 'no-store',
        method: "GET",
        headers: {
            authorization : `Bearer ${token}`
        }
    })
    
    if(!response.ok){
        console.log(response.json)
        throw new Error("Failed to get reservation")
    }
    return await response.json()
}