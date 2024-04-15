export default async function deleteReview(token: string, reviewId : string) {
    const response = await fetch(`http://localhost:5000/api/v1/reviews/${reviewId}`,{
        method : "DELETE",
        headers: {
            authorization : `Bearer ${token}`,
        }
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to delete review")
    }
    return await response.json()
}