const request = require('supertest');
const app = require('../index'); 
const Reservations = require('../models/Reservations');
const Guests = require('../models/Guests'); 
const Rooms = require('../models/Rooms'); 

describe('GET /', () => {
    it('should return a list of reservations with guest and room information', async () => {
      const expectedReservations = [
        {
          id: 1,
          CheckIn: '2023-05-01',
          CheckOut: '2023-05-03',
          ReservationStatus: 'confirmed',
          Source: 'phone',
          totalAmount: 500,
          Guest: {
            id: 1,
            FirstName: 'John'
          },
          Room: {
            RoomNo: '101'
          }
        },
        {
          id: 2,
          CheckIn: '2023-05-05',
          CheckOut: '2023-05-08',
          ReservationStatus: 'expired',
          Source: 'phone',
          totalAmount: 800,
          Guest: {
            id: 2,
            FirstName: 'Jane'
          },
          Room: {
            RoomNo: '102'
          }
        }
      ];
      jest.replaceProperty(Reservations, 'findAll', jest.fn().mockResolvedValue(expectedReservations));

  
      
      const response = await request(app).get('/');
  
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedReservations);
      expect(Reservations.findAll).toHaveBeenCalledTimes(1);
      expect(Reservations.findAll).toHaveBeenCalledWith({
        attributes: ['id', 'CheckIn', 'CheckOut', 'ReservationStatus', 'Source', 'totalAmount'],
        include: [
          {
            model: Guests,
            attributes: ['id', 'FirstName']
          },
          {
            model: Rooms,
            attributes: ['RoomNo']
          }
        ]
      });
    });
  
    it('should return a 500 error if an error occurs while retrieving reservations', async () => {
      // Arrange
      jest.replaceProperty(Reservations, 'findAll', jest.fn().mockResolvedValue(expectedReservations));

  
      // Act
      const response = await request(app).get('/');
  
      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'occured when retrieving reservations' });
      expect(Reservations.findAll).toHaveBeenCalledTimes(1);
    });
  });
