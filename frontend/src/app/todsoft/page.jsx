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
        const payment = await axios.get("http://localhost:5000/api/v1/payments/662cbb89b9b847b1c0d2244b");
        SetImage(payment.data.data.picture);
        console.log(payment);
        console.log(payment.data.data.picture);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <input type='file' onChange={(e) => setFile(e.target.files && e.target.files[0])} />
      <button className='text-black border border-red-400 border-b-red-400' type='button' onClick={upload}>
        Upload
      </button>
      <img src={`/img/${image}`}></img>
    </div>
  );
}
