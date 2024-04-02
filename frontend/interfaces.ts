export interface ReservationItem {
    hotelId: string,
    revDate: string,
    nightNum: number,
}

export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
}

export interface ReserveJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Reservation[]
}

export interface Reservation{
    _id: string,
    revDate : Date,
    nightNum: number,
    user: {
        _id: string,
        name: string
    },
    hotel: {
        _id: string,
        name: string,
        province: string,
        tel: string,
        picture: string,
        id: string
    },
    createdAt: Date,
    __v: number
}

export interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    region: string,
    tel: string,
    picture: string,
    __v: number,
    id: string
}