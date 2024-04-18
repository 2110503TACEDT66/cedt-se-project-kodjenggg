import { ReviewItem } from "interfaces"

export default async function updateReply(token: string, reviewId:string, reviewItem: ReviewItem) {
    const response = await fetch(`http://localhost:5000/api/v1/reviews/reply/${reviewId}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reply:{
                userreply: reviewItem.reply.userreply,
                reply: reviewItem.reply.reply
            }
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to edit reply")
    }
    return await response.json()
}