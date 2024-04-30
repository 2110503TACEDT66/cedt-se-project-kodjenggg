const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import required models and functions
const Review = require('../models/Review');
const { updateReview,deleteHotel } = require('../api_test/reviewsController2');
const Reservation = require('../models/Reservation')
const Hotel = require('../models/Hotel')

describe('reviewController.editReview', () => {
  let mongoServer;
  let connection;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    

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

// Create a mock review
const mockReview = new Review({
  _id: "661d77a077ea322c18627057",
  hotelid: "6600e809f52ff909aed4c203",
  stars: 5,
  comment: "pppp",
  title: "kkkk",
  userid: {
      _id: "6600f8f6f52ff909aed4c227",
      name: "User"
  },
  report: [],
  service: true,
  food: false,
  convenience: false,
  cleanliness: false,
  facility: false,
  worthiness: false,
  __v: 0
});
await mockReview.save();
});

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('when editing a review successfully', () => {
    it('should return a 200 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
          stars: 5,
          comment: "Fantastic stay at this hotel! Impeccable service, stunning views, and delicious dining. Can't wait to return!",
          title: "Unforgettable hotel",
          service: true,
          food: true,
          convenience: false,
          cleanliness: false,
          facility: false,
          worthiness: false,
        },
        params: {
          hotelid: '6600e809f52ff909aed4c203',
          id: '661d77a077ea322c18627057'
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() // Add the json method here
      };

      // Call the addReview function
      await updateReview(req, res, jest.fn());
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(true);
    });
  });



  describe('NO review', () => {
    it('should return a 400 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
        stars: 5,
        comment: "Fantastic stay at this hotel! Impeccable service, stunning views, and delicious dining. Can't wait to return!",
        title: "Unforgettable hotel",
        service: true,
        food: true,
        convenience: false,
        cleanliness: false,
        facility: false,
        worthiness: false,
        },
        params: {
          hotelid: '6600e809f52ff909aed4c203',
          _id: '661d77a077ea322c18627058'
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() // Add the json method here
      };

      // Call the addReview function
      await updateReview(req, res, jest.fn());
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });

  describe('when editing a review successfully', () => {
    it('should return a 200 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
        stars: 5,
        comment: "Fantastic stay at this hotel! Impeccable service, stunning views, and delicious dining. Can't wait to return!",
        title: "Unforgettable hotel",
        service: true,
        food: true,
        convenience: false,
        cleanliness: false,
        facility: false,
        worthiness: false,
        },
        params: {
          hotelid: '6600e809f52ff909aed4c203',
          id: '661d77a077ea322c18627057'
        },
        user: {
          id: '660390243c1841b8294a63c1',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() // Add the json method here
      };

      // Call the addReview function
      await updateReview(req, res, jest.fn());
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });


  describe('when editing a review successfully', () => {
    it('should return a 200 status code', async () => {
      // Mock the request and response objects
      const req = {
        body: {
        stars: 10,
        comment: "Fantastic stay at this hotel! Impeccable service, stunning views, and delicious dining. Can't wait to return!",
        title: "Unforgettable hotel",
        service: true,
        food: true,
        convenience: false,
        cleanliness: false,
        facility: false,
        worthiness: false,
        },
        params: {
          hotelid: '6600e809f52ff909aed4c203',
          id: '661d77a077ea322c18627057'
        },
        user: {
          id: '6600f8f6f52ff909aed4c227',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn() // Add the json method here
      };

      // Call the addReview function
      await updateReview(req, res, jest.fn());
      // Assert the expected behavior
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
     expect(res.json.mock.calls[0][0].success).toBe(false);
    });
  });
//deleting

describe('when deleting a hotel with no hotelid in the database', () => {
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
