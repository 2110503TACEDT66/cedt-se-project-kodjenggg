import { ReviewItem } from "interfaces";

export default async function addReview(token:string, reviewItem: ReviewItem){
    const response = await fetch(`http://localhost:5000/api/v1/reviews`,{
        method : "POST",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hotelid : reviewItem.hotelid,
            stars: reviewItem.stars,
            comment : reviewItem.comment,
            title: reviewItem.title,
            userid: reviewItem.userid,
            report: 0,
            service: reviewItem.service,
            food: reviewItem.food,
            convenience: reviewItem.convenience,
            facility: reviewItem.facility,
            cleanliness: reviewItem.cleanliness,
            worthiness: reviewItem.worthiness
        })
    })
    
    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to create review")
    }
    return await response.json()
}