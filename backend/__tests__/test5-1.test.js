const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import required models and functions
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation')
const { addReview } = require('../api_test/reviewsController');
const { deleteHotel } = require('../api_test/reviewsController');

describe('reviewController.addReview', () => {
  let mongoServer;
  let connection;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a mock hotel
    const mockHotel1 = new Hotel({
         "_id": "6600f814f52ff909aed4c21f",
            "name": "Twilight Hotel",
            "address": "252 Rumpattana Road",
            "district": "Mueang Phuket",
            "province": "Phuket",
            "postalcode": "83000",
            "tel": "085-789-4422",
            "region": "Southern",
            "picture": "https://drive.usercontent.google.com/download?id=1WcDWPHa8RX5Ssh8szAAns0yot7ke7Amt&amp;authuser=0",
            "__v": 0,
            "paymentqr": "https://drive.usercontent.google.com/download?id=1ZuBNpzkmLT1Ea_pxP1E8TMEz7m5OcJ8N&amp;authuser=0",
            "paymentname": "Naomi Mathews",
            "paymentnum": "6051",
            "reservations": [],
            "id": "6600f814f52ff909aed4c21f"
    });
    await mockHotel1.save();

    const mockReservation = new Reservation({
            "_id": "662ca1c2f5aac093ac17d11c",
            "revDate": "2024-04-29T17:00:00.000Z",
            "nightNum": 2,
            "user": {
                "_id": "6600e781f268d57e0b6a87de",
                "name": "Admin",
                "tel": "085-455-9753"
            },
            "hotel": {
                "_id": "6600f814f52ff909aed4c21f",
                "name": "Twilight Hotel",
                "province": "Phuket",
                "tel": "085-789-4422",
                "picture": "https://drive.usercontent.google.com/download?id=1WcDWPHa8RX5Ssh8szAAns0yot7ke7Amt&amp;authuser=0",
                "id": "6600f814f52ff909aed4c21f"
            },
            "room": {
                "_id": "661acfbfc15463157a951567",
                "roomtype": "Suite",
                "bedtype": "Queen Bed",
                "roomcap": 2
            },
            "status": "unpaid",
            "sessionId": "5bef2f50-0463-11ef-9d72-5db911bdfd38",
            "createdAt": "2024-04-27T06:57:06.245Z",
            "__v": 0
  });
  await mockReservation.save();

});

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('when creating a review successfully', () => {
    it('should return a 200 status code', async () => {
      
      //mock api request 
      const req = {
        body: {
            hotelid: "6600f814f52ff909aed4c21f",
            stars: 5,
            comment: "jengg",
            title: "Kogjeng",
            service: true,
            userid: "6600f8f6f52ff909aed4c227"
        },
        params: {
          hotelid: '6600f814f52ff909aed4c21f',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      };

      
      await addReview(req, res, jest.fn());
     
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(true);
    });
  });

  describe('when creating review which inputs disturb the constraint', () => {
    it('should return a 500 status code', async () => {
     
      const req = {
        body: {
            hotelid: "6600f814f52ff909aed4c21f",
            stars: 8,
            comment: "jengg",
            title: "Kogjeng",
            userid: "6600f8f6f52ff909aed4c227"
        },
        params: {
          hotelid: '6600f814f52ff909aed4c21f',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      };

      
      await addReview(req, res, jest.fn());
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });

  describe('when creating a review with does not exist hotel', () => {
    it('should return a 404 status code', async () => {
      
      const req = {
        body: {
            hotelid: "6600e809f52ff909aed4c205",
            stars: 5,
            comment: "One of the highlights of my stay was the hotel's dining options. The on-site restaurant offered a diverse menu featuring both local specialties and international cuisine.",
            title: "dining room",
            userid: "6600f8f6f52ff909aed4c227",
            service: true ,
            food: true ,
            convenience: true ,
            facility: true ,
            cleanliness: true  ,
            worthiness: true 
        },
        params: {
          hotelid: '6600e809f52ff909aed4c205',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      };

      
      await addReview(req, res, jest.fn());
     
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });

 //deleting

  describe('when deleting a hotel that does not exist', () => {
    it('should return 404 response', async () => {
     
      const req = {
        params: {
          hotelid: '6600e809f52ff909aed4c204',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

     
      await deleteHotel(req, res, jest.fn());
     
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });

  describe('when deleting hotel succesfully', () => {
    it('should return 200', async () => {
 
      const req = {
        params: {
          id: '6600f814f52ff909aed4c21f',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      };

     
      await deleteHotel(req, res, jest.fn());
   
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(true);
    });
  });

  describe('when deleting hotel unsuccessfully', () => {
    it('should return 400', async () => {
      
      const req = {
        params: {
          id: '6600f814f52ff909aed4c21f',
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() 
      };

      const mockError = new Error('Something went wrong');
      jest.spyOn(Hotel, 'findById').mockRejectedValue(mockError);

      
      await deleteHotel(req, res, jest.fn());
     
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false
      });
    });
  });


});
