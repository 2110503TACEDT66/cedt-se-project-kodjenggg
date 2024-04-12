export default async function getHotels() {

    //add timeout for loading delay testing
    //await new Promise((resolve)=>setTimeout(resolve,1000))
    
    const response = await fetch(`http://localhost:5000/api/v1/hotels`, {
        next: {tags:['hotels']},
        cache: 'no-store'
    })
    if(!response.ok){
        throw new Error ('Failed to fetch hotels')
    }
    return await response.json()
}