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
        console.log('Received check-in data:', req.body);
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
// Check-in function
export const checkIn = async (req, res) => {
    try {
        const { employeeIds, checkInTime, attendanceStatus, reason } = req.body;
        console.log('Received check-in data:', req.body);

        // Check if employeeIds is an array
        if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
            return res.status(400).json({ error: 'Invalid employeeIds' });
        }

        // Loop through each employeeId and perform check-in
        for (const employeeId of employeeIds) {
            // Find employee by ID
            const employee = await Employee.findById(employeeId);

            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            // Check if already checked in
            if (employee.employmentInformation.checkInTime) {
                return res.status(400).json({ error: 'Employee already checked in' });
            }

            // Set check-in information
            employee.employmentInformation.checkInTime = checkInTime;

            // Add attendance history
            employee.employmentInformation.attendanceHistory.push({
                date: new Date(),
                status: attendanceStatus,
                reason: reason,
            });

            // Save changes
            await employee.save();
        }

        res.status(200).json({ message: 'Check-in recorded successfully' });
    } catch (error) {
        console.error('Error recording check-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

