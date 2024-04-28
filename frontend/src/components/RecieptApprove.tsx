'use client'
import getUserProfile from "@/libs/getUserProfile";
import updateReservationStatus from "@/libs/updateReservationStatus";
import { Payment, Reservation } from "interfaces";
import Link from "next/link";
export default async function RecieptApprove({ session , payment}: { session: any , payment : Payment }) {
    // const [id, setId] = useState('');
    // const [PaymentReady, setPaymentReady] = useState<Payment>();
    // const urlParams = useSearchParams()

    // useEffect(() => {
    //     // Extract id parameter client-side
    //     const idParam = urlParams.get('id');
    //     // Fetch payment data only if idParam is available
    //     if (idParam) {
    //         setId(idParam);
    //          const fetchData = async () =>  {
    //             const [paymentData] = await Promise.all([getPayment(id)]);
    //             setPaymentReady(paymentData);
    //         }
    //         fetchData();
    //     }
    // }, [urlParams]);



    //console.log(id) ;
    //console.log(PaymentReady);
    if ( !payment ) {
        return
    }

    var payTime = payment.data.paytime.substring(11, 19);
    var hour = parseInt(payTime.substring(0, 2), 10); // Convert the first two characters (hours) to an integer
    hour = ( hour + 7 ) % 24;
    const realtime = hour + payTime.substring(2,19) ;


    


    const profile = await getUserProfile(session.user.token);
    console.log(profile?.data?.role)


    const updateStatus = async() => {
        if ( payment.data.reservid && session?.user?.token ) {
            const reserveItem:Reservation= {
                _id: '',
                revDate : '',
                nightNum: 0,
                user: {
                    _id: '',
                    name: ''
                },
                hotel: {
                    _id: '',
                    name: '',
                    province: '',
                    tel: '',
                    picture: '',
                    id: ''
                },
                status: "reserved",
                createdAt: new Date(Date.now()),
                __v: 0
            }
            const res = await updateReservationStatus(session?.user.token , payment.data.reservid._id ,reserveItem )
            console.log(res) ;
        }
        
    }


    return (
        <div className="flex justify-center items-center">
            {profile?.data?.role === "hotelmanager" ? (
                <main className="w-[65%]  flex flex-col items-center justify-center">
                    <div className="text-[#363062] text-[30px] font-extrabold text-center underline decortion-[#363062] underline-offset-[4px] my-[20px]">Payment Confirmation</div>
                    <div className="flex flex-row w-[80%] mx-auto h-[410px] shadow-xl">
                        <div className="w-auto h-auto rounded-l-md text-black overflow-hidden">
                            <img src={payment.data.image} className="h-[100%]" alt="Hotel" />
                        </div>
                        <div className="w-[60%] bg-[#4D4C7D] h-[100%] rounded-r-md py-10 px-10 flex flex-col justify-around relative">
                            <div className="italic text-[20px] flex">User: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.user.name}</div></div>
                            <div className="italic text-[20px] flex">Hotel: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.hotel.name}</div></div>
                            <div className="italic text-[20px] flex">Room Type: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.room.roomtype}</div></div>
                            <div className="italic text-[20px] flex">Reservation Date: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.revDate.substring(0, 10)}</div></div>
                            <div className="italic text-[20px] flex">Total Night: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.nightNum}</div></div>
                            <div className="italic text-[20px] flex">Total Deposit: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.reservid.totalPrice}</div></div>
                            <div className="italic text-[20px] flex">Payment Date: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic">{payment.data.paytime.substring(0,10)}</div></div>
                            <div className="italic text-[20px] flex">Payment Time: <div className="text-[20px] text-[#D9D9D9] pl-[10px] not-italic"></div>{realtime}</div>
                        </div>
                    </div>
                    <div className="m-5">
                        <button className="bg-[#CC382E] p-3 rounded-xl w-[150px] font-semibold mr-8 text-xl">Disapprove</button>
                        <Link href={"/mybooking"}><button className="bg-[#1EB012] p-3 rounded-xl w-[150px] font-semibold ml-8 text-xl" onClick={updateStatus}>Approve</button></Link>
                    </div>
                </main>
            ) : (
                <main>
                    <div className="text-gray-600 flex h-screen flex-col justify-center items-center">
                        You are not authorized to access this page
                    </div>
                </main>
            )}
        </div>
    );
}
