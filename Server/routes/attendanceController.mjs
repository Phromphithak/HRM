import { Employee } from "../db/models/employee.mjs";

// บันทึกข้อมูลการขาดงาน
export const recordAbsence = async (req, res) => {
    try {
        const { employeeId, date, reason } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการขาดงาน
        employee.employmentInformation.leaveHistory.push({
            startDate: date,
            endDate: date,
            reason: reason,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Absence recorded successfully' });
    } catch (error) {
        console.error('Error recording absence:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// บันทึกข้อมูลการลา
export const recordLeave = async (req, res) => {
    try {
        const { employeeId, startDate, endDate, leaveType, reason } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการลา
        employee.employmentInformation.leaveHistory.push({
            startDate,
            endDate,
            leaveType,
            reason,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Leave recorded successfully' });
    } catch (error) {
        console.error('Error recording leave:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// บันทึกข้อมูลการมาสาย
export const recordLate = async (req, res) => {
    try {
        const { employeeId, date, lateTime } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการมาสาย
        employee.employmentInformation.leaveHistory.push({
            date,
            lateTime,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Late recorded successfully' });
    } catch (error) {
        console.error('Error recording late:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// เข้างาน
export const checkIn = async (req, res) => {
    try {
        const { employeeId, checkInTime } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // ตรวจสอบว่ามีการเช็คอินแล้วหรือไม่
        if (employee.employmentInformation.checkInTime) {
            return res.status(400).json({ error: 'Already checked in' });
        }

        // เข้างาน
        employee.employmentInformation.checkInTime = checkInTime;

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Check-in recorded successfully' });
    } catch (error) {
        console.error('Error recording check-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};