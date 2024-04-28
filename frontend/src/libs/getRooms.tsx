export default async function getRooms(id:string) {
    const response = await fetch(`http://localhost:5000/api/v1/rooms/${id}`, {
        cache: 'no-store',
        method: "GET",
    });
    if(!response.ok){
        throw new Error ('Failed to fetch hotel')
    }
    return await response.json()
}