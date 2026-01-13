// import express
const express=require('express')
const userController=require('../controller/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const seatController=require('../controller/seatController')
const adminController=require('../controller/adminController')
const eventController=require('../controller/eventController')
const bookController=require('../controller/bookController')

// create router object
const router=new express.Router()

// define path for client api request
// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// goolelogin
router.post('/google/sign-in',userController.googleLoginController)

// router.get('/all-events', adminController.getAllEvents);

// fetch event
router.get('/get-seats',seatController.getAllSeats)

// seatbook
router.post('/book-seats',jwtMiddleware,seatController.bookSeats)

// booked seats
router.get('/user-bookings',jwtMiddleware,seatController.getUserBookings)

// -----------coordinator---------

// Coordinator adds an event
router.post('/add-event', jwtMiddleware, eventController.addEvent);

// Coordinator sees their own events
router.get('/get-coordinator-events', jwtMiddleware, eventController.getCoordinatorEvents);



// -----------admin-------------

// /get all users
router.get('/admin/all-users', jwtMiddleware, adminController.getAllUsers);

// delete user
router.delete('/admin/delete-user/:id', jwtMiddleware, adminController.deleteUser);

// get all bookings
router.get('/admin/all-bookings', jwtMiddleware, adminController.getAllBookings);

// delete booking
router.delete('/admin/delete-booking/:id', jwtMiddleware, adminController.deleteBooking);

// get all events
router.get('/all-app-events', jwtMiddleware, eventController.getAllEvents);

// Admin approves an event
router.put('/approve-event/:id', jwtMiddleware, eventController.approveEvent);

// get approved events at home
router.get('/home-events', eventController.getHomeEvents);

// Route to get seats filtered by a specific Event ID
router.get('/get-all-seats/:eventId', bookController.getOccupiedSeats);


module.exports=router