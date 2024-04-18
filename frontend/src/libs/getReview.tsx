import { Tags } from "interfaces"

export default async function getReviews(tags:Tags,hid:string) {
    let query="";
    for (const [key, value] of Object.entries(tags)) {
        //console.log(`key=${key} value=${value} `)
        // if(query==="" && value){
        //     if(key=="stars"){ if(value!==null){ query = query + `&${key}=${value} ` }}
        //     else{ query = query + `${key}=true`}    
        // }
        if(key=="stars"){
            if(value!==null){query = query + `&${key}=${value}`}
        }
        else if(value){
            query = query + `&${key}=true`
        }
        //console.log(query)
    }
    //console.log(query)

    const response = await fetch (`http://localhost:5000/api/v1/reviews?hotelid=${hid}${query}`,{
        cache: 'no-store',
        method: "GET",
        
    })
    
    if(!response.ok){
        console.log(response.json)
        throw new Error("Failed to get reviews")
    }
    return await response.json()
}