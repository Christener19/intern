// import block
import express from 'express';
import * as attendanceController from '../controllers/attendanceController'

export const attendanceRoutes = express.Router();

// route for GET
attendanceRoutes.get('/', attendanceController.getBootcampers)

attendanceRoutes.get('/', attendanceController.getAbsentBootcampers);

// route for patch
attendanceRoutes.patch('/:id', attendanceController.registerBootcamperAttendance)