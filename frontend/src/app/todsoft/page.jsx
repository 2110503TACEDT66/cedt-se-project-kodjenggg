'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getPayment from '@/libs/getPayment';

export default function Todsoft() {
  const [file, setFile] = useState(null);
  const [image , SetImage] = useState() ;
  const upload = (e) => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:5000/api/v1/payments', formData)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res)
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payment = await getPayment("662c9e8cdaf01e196903b238");
        SetImage(payment.data.picture);
        console.log(payment);
        console.log(payment.data.picture);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  
  
  

  // const updateReservationPayment = (fileName) => {
  //   axios
  //     .put('http://localhost:5000/api/v1/payments', { payment: fileName })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((er) => console.log(er));
  // };

  return (
    <div>
      <input type='file' onChange={(e) => setFile(e.target.files && e.target.files[0])} />
      <button className='text-black border border-red-400 border-b-red-400' type='button' onClick={upload}>
        Upload
      </button>
      <img src={`http://localhost:5000/img/${image}`}></img>
    </div>
  );
}
