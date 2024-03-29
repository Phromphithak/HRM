import express from 'express';
import { recordLeave,recordLate,checkIn, recordAbsence,attendance } from "./attendanceController.mjs"

const router = express.Router();

router.get('/attendance', attendance)

// บันทึกข้อมูลการขาดงาน
router.post('/recordAbsence', recordAbsence);

// บันทึกข้อมูลการลา
router.post('/recordLeave', recordLeave);

// บันทึกข้อมูลการมาสาย
router.post('/recordLate', recordLate);

// บันทึกเข้างาน
router.post('/checkIn', checkIn);

export default router;