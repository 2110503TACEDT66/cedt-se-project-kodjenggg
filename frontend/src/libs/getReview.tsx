import { Tags } from "interfaces"

export default async function getReviews(tags:Tags) {
    let query="";
    for (const [key, value] of Object.entries(tags)) {
        //console.log(`key=${key} value=${value} `)
        if(query==="" && value){
            query = query + `${key}=true`
        }
        else if(key=="stars"){
            if(value!=null) query = query + `&${key}=${value}`
        }
        else if(value){
            query = query + `&${key}=true`
        }
    }
    //console.log(query)

    const response = await fetch (`${process.env.BACKEND_URL}/api/v1/reviews?${query}`,{
        cache: 'no-store',
        method: "GET",
        
    })
    
    if(!response.ok){
        console.log(response.json)
        throw new Error("Failed to get reviews")
    }
    return await response.json()
}