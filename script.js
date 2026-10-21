// Medicare Hospital Management System - Core JavaScript
// Storage keys
const STORAGE_KEYS = {
    PATIENTS: "patients",
    DOCTORS: "doctors",
    APPOINTMENTS: "appointments",
    STAFF: "staffMembers",
    BILLS: "bills",
    PAYMENTS: "payments",
    INITIALIZED: "medicare_initialized",
    USERNAME: "username",
    ROLE: "role"
};

// Seed initial realistic data if empty
function initializeSeedData() {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
        const seedPatients = [
            { id: "P001", name: "Rahul Kumar", age: "25", gender: "Male", phone: "9876543210", disease: "Fever & Viral Infection", address: "A-12, Sector 15, New Delhi" },
            { id: "P002", name: "Neha Sharma", age: "28", gender: "Female", phone: "9876543211", disease: "Migraine & Headache", address: "B-44, Rohini, New Delhi" },
            { id: "P003", name: "Amit Singh", age: "35", gender: "Male", phone: "9876543212", disease: "Chronic Back Pain", address: "C-102, Connaught Place, New Delhi" },
            { id: "P004", name: "Pooja Patel", age: "31", gender: "Female", phone: "9876543213", disease: "Skin Allergy", address: "D-8, South Extension, New Delhi" }
        ];

        const seedDoctors = [
            { id: "D001", name: "Dr. Rahul Sharma", specialization: "Cardiologist", department: "Cardiology", contact: "9876543220", availability: "Available" },
            { id: "D002", name: "Dr. Priya Singh", specialization: "General Physician", department: "General Medicine", contact: "9876543221", availability: "Available" },
            { id: "D003", name: "Dr. Amit Kumar", specialization: "Orthopedic", department: "Orthopedics", contact: "9876543222", availability: "Available" },
            { id: "D004", name: "Dr. Sunita Gupta", specialization: "Dermatologist", department: "Dermatology", contact: "9876543223", availability: "Available" }
        ];

        const seedAppointments = [
            { id: "A001", patientId: "P001", patientName: "Rahul Kumar", phone: "9876543210", doctor: "Dr. Rahul Sharma - Cardiologist", date: "2026-10-22", time: "10:30", symptoms: "Fever and mild cough" },
            { id: "A002", patientId: "P002", patientName: "Neha Sharma", phone: "9876543211", doctor: "Dr. Priya Singh - General Physician", date: "2026-10-22", time: "12:00", symptoms: "Severe migraine headache" },
            { id: "A003", patientId: "P003", patientName: "Amit Singh", phone: "9876543212", doctor: "Dr. Amit Kumar - Orthopedic", date: "2026-10-23", time: "16:30", symptoms: "Lower back pain" },
            { id: "A004", patientId: "P004", patientName: "Pooja Patel", phone: "9876543213", doctor: "Dr. Sunita Gupta - Dermatologist", date: "2026-10-24", time: "11:15", symptoms: "Skin rash and itching" }
        ];

        const seedStaff = [
            { id: "S001", name: "Sunita Rao", role: "Nurse", phone: "9876543230" },
            { id: "S002", name: "Ramesh Verma", role: "Receptionist", phone: "9876543231" },
            { id: "S003", name: "Anita Patel", role: "Pharmacist", phone: "9876543232" },
            { id: "S004", name: "Vikas Mehra", role: "Lab Technician", phone: "9876543233" }
        ];

        const seedBills = [
            { id: "B001", patientId: "P001", treatmentCharges: 2000, doctorCharges: 500, total: 2500 },
            { id: "B002", patientId: "P002", treatmentCharges: 1500, doctorCharges: 500, total: 2000 },
            { id: "B003", patientId: "P003", treatmentCharges: 3000, doctorCharges: 800, total: 3800 },
            { id: "B004", patientId: "P004", treatmentCharges: 1200, doctorCharges: 400, total: 1600 }
        ];

        const seedPayments = [
            { id: "PAY001", billId: "B001", patientId: "P001", amount: 2500, date: "2026-10-20", status: "Paid" },
            { id: "PAY002", billId: "B002", patientId: "P002", amount: 2000, date: "2026-10-21", status: "Paid" },
            { id: "PAY003", billId: "B003", patientId: "P003", amount: 3800, date: "2026-10-21", status: "Pending" },
            { id: "PAY004", billId: "B004", patientId: "P004", amount: 1600, date: "2026-10-22", status: "Paid" }
        ];

        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(seedPatients));
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(seedDoctors));
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(seedAppointments));
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(seedStaff));
        localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(seedBills));
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(seedPayments));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
    }
}

// In-memory data collections synchronized with localStorage
let patients = JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS)) || [];
let doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS)) || [];
let appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) || [];
let staffMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || [];
let bills = JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS)) || [];
let payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS)) || [];

function reloadData() {
    patients = JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS)) || [];
    doctors = JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS)) || [];
    appointments = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) || [];
    staffMembers = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF)) || [];
    bills = JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS)) || [];
    payments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS)) || [];
}

// Visual Toast feedback
function showToast(message, type = "success") {
    let existingToast = document.querySelector(".medicare-toast");
    if (existingToast) {
        existingToast.remove();
    }
    const toast = document.createElement("div");
    toast.className = `medicare-toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: ${type === "error" ? "#e63946" : "#0077b6"};
        color: white;
        padding: 14px 22px;
        border-radius: 8px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        z-index: 99999;
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}

// Authentication & Logout
function setupLoginForm() {
    const loginForm = document.querySelector("#loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const usernameInput = document.querySelector("#username");
        const passwordInput = document.querySelector("#password");
        const roleInput = document.querySelector("#role");

        const username = usernameInput ? usernameInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";
        const role = roleInput ? roleInput.value : "";

        if (!username || !password || !role) {
            alert("Please enter username, password, and select your role.");
            return;
        }

        localStorage.setItem(STORAGE_KEYS.USERNAME, username);
        localStorage.setItem(STORAGE_KEYS.ROLE, role);

        switch (role) {
            case "admin":
                window.location.href = "admin.html";
                break;
            case "doctor":
                window.location.href = "doctor.html";
                break;
            case "staff":
                window.location.href = "staff.html";
                break;
            case "patient":
                window.location.href = "patient-dashboard.html";
                break;
            case "appointment":
                window.location.href = "appointment.html";
                break;
            case "payment":
                window.location.href = "payment.html";
                break;
            default:
                window.location.href = "index.html";
        }
    });
}

function logout() {
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    window.location.href = "login.html";
}

// Dynamic Navigation
function setupDynamicNavigation() {
    const role = localStorage.getItem(STORAGE_KEYS.ROLE) || "admin";
    let target = "admin.html";
    let label = "Back to Dashboard";

    if (role === "doctor") {
        target = "doctor.html";
        label = "Back to Doctor Dashboard";
    } else if (role === "staff") {
        target = "staff.html";
        label = "Back to Staff Dashboard";
    } else if (role === "patient") {
        target = "patient-dashboard.html";
        label = "Back to Patient Portal";
    } else if (role === "admin") {
        target = "admin.html";
        label = "Back to Admin Dashboard";
    }

    const backButtons = document.querySelectorAll(".back-btn, .back-to-dashboard");
    backButtons.forEach(btn => {
        const currentHref = btn.getAttribute("href");
        if (currentHref === "admin.html" || currentHref === "doctor.html" || currentHref === "staff.html" || btn.classList.contains("dynamic-back")) {
            btn.href = target;
            btn.innerHTML = `← ${label}`;
        }
    });

    const userInfoEl = document.querySelector(".current-user-badge");
    const currentUsername = localStorage.getItem(STORAGE_KEYS.USERNAME);
    if (userInfoEl && currentUsername) {
        userInfoEl.textContent = `${currentUsername} (${role.toUpperCase()})`;
    }
}

// ---------------- PATIENT MANAGEMENT ----------------
function savePatient() {
    const name = document.querySelector("#patientName")?.value.trim();
    const age = document.querySelector("#age")?.value.trim();
    const gender = document.querySelector("#gender")?.value;
    const phone = document.querySelector("#phone")?.value.trim();
    const disease = document.querySelector("#disease")?.value.trim();
    const address = document.querySelector("#address")?.value.trim();
    let id = document.querySelector("#patientId")?.value.trim();

    if (!name || !age || !gender || !phone || !disease || !address) {
        alert("Please fill all required patient details.");
        return;
    }

    if (!id) {
        id = "P" + String(patients.length + 1).padStart(3, "0");
    }

    const newPatient = { id, name, age, gender, phone, disease, address };
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));

    showToast("Patient saved successfully!");
    clearForm();
    displayPatients();
    updateAdminDashboard();
}

function displayPatients() {
    const table = document.querySelector("#patientTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (patients.length === 0) {
        table.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#888; padding:20px;">No patient records found. Register a new patient above.</td></tr>`;
        return;
    }

    patients.forEach((patient, index) => {
        table.innerHTML += `
            <tr>
                <td><strong>${patient.id}</strong></td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.phone}</td>
                <td>${patient.disease}</td>
                <td>${patient.address}</td>
                <td>
                    <button class="delete-btn" onclick="deletePatient(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deletePatient(index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
        showToast("Patient deleted successfully.");
        displayPatients();
        updateAdminDashboard();
    }
}

// ---------------- DOCTOR MANAGEMENT ----------------
function saveDoctor() {
    const name = document.querySelector("#doctorName")?.value.trim();
    const specialization = document.querySelector("#specialization")?.value;
    const department = document.querySelector("#department")?.value;
    const contact = document.querySelector("#doctorContact")?.value.trim();
    const availability = document.querySelector("#availability")?.value;
    let id = document.querySelector("#doctorId")?.value.trim();

    if (!name || !specialization || !department || !contact || !availability) {
        alert("Please fill all doctor details.");
        return;
    }

    if (!id) {
        id = "D" + String(doctors.length + 1).padStart(3, "0");
    }

    const newDoctor = { id, name, specialization, department, contact, availability };
    doctors.push(newDoctor);
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));

    showToast("Doctor saved successfully!");
    clearForm();
    displayDoctors();
    populatePublicDoctorOptions();
    updateAdminDashboard();
}

function displayDoctors() {
    const table = document.querySelector("#doctorTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (doctors.length === 0) {
        table.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#888; padding:20px;">No doctor records found. Add a doctor above.</td></tr>`;
        return;
    }

    doctors.forEach((doctor, index) => {
        const isAvailable = doctor.availability === "Available" || doctor.availability === "Yes";
        const badgeColor = isAvailable ? "#2a9d8f" : "#e76f51";
        table.innerHTML += `
            <tr>
                <td><strong>${doctor.id}</strong></td>
                <td>${doctor.name}</td>
                <td>${doctor.specialization}</td>
                <td>${doctor.department}</td>
                <td>${doctor.contact}</td>
                <td>
                    <span style="background:${badgeColor}20; color:${badgeColor}; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:12px;">
                        ${doctor.availability}
                    </span>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteDoctor(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteDoctor(index) {
    if (confirm("Are you sure you want to delete this doctor?")) {
        doctors.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
        showToast("Doctor deleted successfully.");
        displayDoctors();
        populatePublicDoctorOptions();
        updateAdminDashboard();
    }
}

// ---------------- APPOINTMENT MANAGEMENT ----------------
function saveAppointment() {
    let patientId = document.querySelector("#appointmentPatientId")?.value.trim();
    const patientName = document.querySelector("#appointmentPatientName")?.value.trim();
    const phone = document.querySelector("#appointmentPhone")?.value.trim();
    const doctor = document.querySelector("#appointmentDoctor")?.value.trim();
    const date = document.querySelector("#appointmentDate")?.value;
    const time = document.querySelector("#appointmentTime")?.value;
    const symptoms = document.querySelector("#symptoms")?.value.trim();
    let id = document.querySelector("#appointmentId")?.value.trim();

    if (!patientName || !phone || !doctor || !date || !time || !symptoms) {
        alert("Please fill all required appointment details.");
        return;
    }

    // If Patient ID not entered, find or create patient record automatically
    if (!patientId) {
        reloadData();
        const existingPatient = patients.find(p => p.phone === phone || p.name.toLowerCase() === patientName.toLowerCase());
        if (existingPatient) {
            patientId = existingPatient.id;
        } else {
            patientId = "P" + String(patients.length + 1).padStart(3, "0");
            patients.push({
                id: patientId,
                name: patientName,
                age: "N/A",
                gender: "N/A",
                phone: phone,
                disease: symptoms,
                address: "Hospital Reception"
            });
            localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
            displayPatients();
        }
    }

    if (!id) {
        id = "A" + String(appointments.length + 1).padStart(3, "0");
    }

    const newAppointment = { id, patientId, patientName, phone, doctor, date, time, symptoms };
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

    showToast("Appointment booked successfully!");
    clearForm();
    displayAppointments();
    updateAdminDashboard();
    updateDoctorDashboard();
}

// DIRECT PUBLIC APPOINTMENT BOOKING (NO LOGIN REQUIRED)
function handlePublicBooking(e) {
    if (e) e.preventDefault();

    const name = document.querySelector("#pubPatientName")?.value.trim();
    const phone = document.querySelector("#pubPhone")?.value.trim();
    const age = document.querySelector("#pubAge")?.value.trim() || "N/A";
    const gender = document.querySelector("#pubGender")?.value || "N/A";
    const doctor = document.querySelector("#pubDoctor")?.value.trim();
    const date = document.querySelector("#pubDate")?.value;
    const time = document.querySelector("#pubTime")?.value;
    const symptoms = document.querySelector("#pubSymptoms")?.value.trim();

    if (!name || !phone || !doctor || !date || !time || !symptoms) {
        alert("Please complete all required fields (Name, Phone, Doctor, Date, Time, and Symptoms).");
        return;
    }

    reloadData();

    // Check if patient already exists by phone, otherwise auto-create record
    let patient = patients.find(p => p.phone === phone);
    let patientId;
    if (patient) {
        patientId = patient.id;
    } else {
        patientId = "P" + String(patients.length + 1).padStart(3, "0");
        patients.push({
            id: patientId,
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            disease: symptoms,
            address: "Online Direct Booking"
        });
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    }

    // Create Appointment
    const appointmentId = "A" + String(appointments.length + 1).padStart(3, "0");
    const newAppointment = {
        id: appointmentId,
        patientId: patientId,
        patientName: name,
        phone: phone,
        doctor: doctor,
        date: date,
        time: time,
        symptoms: symptoms
    };

    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

    // Show Confirmation Card
    const confirmBox = document.querySelector("#bookingConfirmationBox");
    const formBox = document.querySelector("#publicBookingForm");

    if (confirmBox) {
        const confId = document.querySelector("#confAppointmentId");
        const confName = document.querySelector("#confPatientName");
        const confDoctor = document.querySelector("#confDoctor");
        const confDateTime = document.querySelector("#confDateTime");
        const confPhone = document.querySelector("#confPhone");

        if (confId) confId.textContent = appointmentId;
        if (confName) confName.textContent = name;
        if (confDoctor) confDoctor.textContent = doctor;
        if (confDateTime) confDateTime.textContent = `${date} at ${formatTime(time)}`;
        if (confPhone) confPhone.textContent = phone;

        confirmBox.style.display = "block";
        if (formBox) {
            formBox.style.display = "none";
        }
        confirmBox.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        alert(`Appointment Booked Successfully!\n\nAppointment ID: ${appointmentId}\nPatient: ${name}\nDoctor: ${doctor}\nSlot: ${date} at ${formatTime(time)}\n\nNo login is required. Please save this Appointment ID for your visit.`);
        if (formBox) formBox.reset();
    }

    showToast(`Appointment ${appointmentId} confirmed for ${name}!`);
    updateAdminDashboard();
    updateDoctorDashboard();
    displayAppointments();
}

function bookAnotherAppointment() {
    const confirmBox = document.querySelector("#bookingConfirmationBox");
    const formBox = document.querySelector("#publicBookingForm");
    if (confirmBox) confirmBox.style.display = "none";
    if (formBox) {
        formBox.style.display = "block";
        formBox.reset();
        formBox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function populatePublicDoctorOptions() {
    const pubDoctorSelect = document.querySelector("#pubDoctor");
    if (!pubDoctorSelect) return;

    reloadData();
    pubDoctorSelect.innerHTML = `<option value="">Select Doctor & Specialty</option>`;
    doctors.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = `${doc.name} - ${doc.specialization} (${doc.department})`;
        opt.textContent = `${doc.name} - ${doc.specialization} (${doc.department}) [${doc.availability}]`;
        pubDoctorSelect.appendChild(opt);
    });
}

function formatTime(time) {
    if (!time) return "";
    let parts = time.split(":");
    let hour = parseInt(parts[0], 10);
    let minute = parts[1] || "00";
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
}

function displayAppointments() {
    const table = document.querySelector("#appointmentTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (appointments.length === 0) {
        table.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#888; padding:20px;">No appointments scheduled. Book an appointment above.</td></tr>`;
        return;
    }

    appointments.forEach((appointment, index) => {
        table.innerHTML += `
            <tr>
                <td><strong>${appointment.id}</strong></td>
                <td>${appointment.patientId}</td>
                <td>${appointment.patientName}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.date}</td>
                <td>${formatTime(appointment.time)}</td>
                <td>${appointment.symptoms}</td>
                <td>
                    <button class="delete-btn" onclick="deleteAppointment(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteAppointment(index) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        appointments.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
        showToast("Appointment removed.");
        displayAppointments();
        updateAdminDashboard();
        updateDoctorDashboard();
    }
}

// ---------------- STAFF MANAGEMENT ----------------
function saveStaff() {
    const name = document.querySelector("#staffName")?.value.trim();
    const role = document.querySelector("#staffRole")?.value;
    const phone = document.querySelector("#staffPhone")?.value.trim();
    let id = document.querySelector("#staffId")?.value.trim();

    if (!name || !role || !phone) {
        alert("Please fill all staff details.");
        return;
    }

    if (!id) {
        id = "S" + String(staffMembers.length + 1).padStart(3, "0");
    }

    const newStaff = { id, name, role, phone };
    staffMembers.push(newStaff);
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffMembers));

    showToast("Staff member saved successfully!");
    clearForm();
    displayStaff();
    updateStaffDashboard();
}

function displayStaff() {
    const table = document.querySelector("#staffTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (staffMembers.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:20px;">No staff records found. Add staff above.</td></tr>`;
        return;
    }

    staffMembers.forEach((staff, index) => {
        table.innerHTML += `
            <tr>
                <td><strong>${staff.id}</strong></td>
                <td>${staff.name}</td>
                <td>${staff.role}</td>
                <td>${staff.phone}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStaff(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteStaff(index) {
    if (confirm("Are you sure you want to delete this staff member?")) {
        staffMembers.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffMembers));
        showToast("Staff member deleted.");
        displayStaff();
        updateStaffDashboard();
    }
}

// ---------------- BILLING MANAGEMENT ----------------
function calculateBill() {
    const treatmentInput = document.querySelector("#treatmentCharges");
    const doctorInput = document.querySelector("#doctorCharges");
    const treatment = parseFloat(treatmentInput?.value) || 0;
    const doctor = parseFloat(doctorInput?.value) || 0;
    const total = treatment + doctor;

    const totalBox = document.querySelector("#total");
    if (totalBox) {
        totalBox.value = total;
    }
    const totalText = document.querySelector("#totalAmount");
    if (totalText) {
        if (totalText.tagName === "SPAN") {
            totalText.textContent = total;
        } else {
            totalText.innerHTML = `Total Amount: ₹<span>${total}</span>`;
        }
    }
}

function saveBill() {
    const patientId = document.querySelector("#billPatientId")?.value.trim();
    const treatment = parseFloat(document.querySelector("#treatmentCharges")?.value) || 0;
    const doctor = parseFloat(document.querySelector("#doctorCharges")?.value) || 0;
    let id = document.querySelector("#billId")?.value.trim();

    if (!patientId) {
        alert("Please enter Patient ID.");
        return;
    }

    if (!id) {
        id = "B" + String(bills.length + 1).padStart(3, "0");
    }

    const newBill = {
        id,
        patientId,
        treatmentCharges: treatment,
        doctorCharges: doctor,
        total: treatment + doctor
    };

    bills.push(newBill);
    localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));

    showToast("Bill saved successfully!");
    clearForm();
    calculateBill();
    displayBills();
    updateAdminDashboard();
}

function displayBills() {
    const table = document.querySelector("#billTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (bills.length === 0) {
        table.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888; padding:20px;">No bills generated yet. Create a bill above.</td></tr>`;
        return;
    }

    bills.forEach((bill, index) => {
        table.innerHTML += `
            <tr>
                <td><strong>${bill.id}</strong></td>
                <td>${bill.patientId}</td>
                <td>₹${Number(bill.treatmentCharges).toLocaleString()}</td>
                <td>₹${Number(bill.doctorCharges).toLocaleString()}</td>
                <td><strong>₹${Number(bill.total).toLocaleString()}</strong></td>
                <td>
                    <button class="delete-btn" onclick="deleteBill(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteBill(index) {
    if (confirm("Are you sure you want to delete this bill?")) {
        bills.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(bills));
        showToast("Bill deleted.");
        displayBills();
        updateAdminDashboard();
    }
}

function printBill() {
    window.print();
}

// ---------------- PAYMENT MANAGEMENT ----------------
function savePayment() {
    const billId = document.querySelector("#paymentBillId")?.value.trim();
    const patientId = document.querySelector("#paymentPatientId")?.value.trim();
    const amount = parseFloat(document.querySelector("#paymentAmount")?.value) || 0;
    const date = document.querySelector("#paymentDate")?.value;
    const status = document.querySelector("#paymentStatus")?.value;
    let id = document.querySelector("#paymentId")?.value.trim();

    if (!billId || !patientId || !amount || !date || !status) {
        alert("Please fill all payment details.");
        return;
    }

    if (!id) {
        id = "PAY" + String(payments.length + 1).padStart(3, "0");
    }

    const newPayment = { id, billId, patientId, amount, date, status };
    payments.push(newPayment);
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));

    showToast("Payment recorded successfully!");
    clearForm();
    displayPayments();
    updateAdminDashboard();
}

function displayPayments() {
    const table = document.querySelector("#paymentTable");
    if (!table) return;

    reloadData();
    table.innerHTML = "";

    if (payments.length === 0) {
        table.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#888; padding:20px;">No payment records found. Record a payment above.</td></tr>`;
        return;
    }

    payments.forEach((payment, index) => {
        const isPaid = payment.status === "Paid";
        const badgeColor = isPaid ? "#2a9d8f" : "#e76f51";
        table.innerHTML += `
            <tr>
                <td><strong>${payment.id}</strong></td>
                <td>${payment.billId}</td>
                <td>${payment.patientId}</td>
                <td><strong>₹${Number(payment.amount).toLocaleString()}</strong></td>
                <td>${payment.date}</td>
                <td>
                    <span style="background:${badgeColor}20; color:${badgeColor}; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:12px;">
                        ${payment.status}
                    </span>
                </td>
                <td>
                    <button class="delete-btn" onclick="deletePayment(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deletePayment(index) {
    if (confirm("Are you sure you want to delete this payment?")) {
        payments.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
        showToast("Payment deleted.");
        displayPayments();
        updateAdminDashboard();
    }
}

function clearForm() {
    const form = document.querySelector("form");
    if (form) {
        form.reset();
    }
    const totalAmountSpan = document.querySelector("#totalAmount");
    if (totalAmountSpan) {
        if (totalAmountSpan.tagName === "SPAN") {
            totalAmountSpan.textContent = "0";
        } else {
            totalAmountSpan.textContent = "Total Amount: ₹0";
        }
    }
}

// ---------------- DASHBOARDS AND LIVE VIEWS ----------------

// 1. Admin Dashboard
function updateAdminDashboard() {
    reloadData();
    const patientCountEl = document.querySelector("#totalPatientsCount");
    const doctorCountEl = document.querySelector("#totalDoctorsCount");
    const appointmentCountEl = document.querySelector("#totalAppointmentsCount");
    const billingCountEl = document.querySelector("#totalBillingCount");

    if (patientCountEl) patientCountEl.textContent = patients.length;
    if (doctorCountEl) doctorCountEl.textContent = doctors.length;
    if (appointmentCountEl) appointmentCountEl.textContent = appointments.length;

    if (billingCountEl) {
        const totalRevenue = bills.reduce((sum, b) => sum + (parseFloat(b.total) || 0), 0);
        billingCountEl.textContent = `₹${totalRevenue.toLocaleString()}`;
    }

    const adminRecentTable = document.querySelector("#adminRecentAppointments");
    if (adminRecentTable) {
        adminRecentTable.innerHTML = "";
        if (appointments.length === 0) {
            adminRecentTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:15px;">No appointments found.</td></tr>`;
            return;
        }
        const recentAppointments = appointments.slice(-5).reverse();
        recentAppointments.forEach(app => {
            adminRecentTable.innerHTML += `
                <tr>
                    <td><strong>${app.id}</strong></td>
                    <td>${app.patientName}</td>
                    <td>${app.doctor}</td>
                    <td>${app.date}</td>
                    <td>${formatTime(app.time)}</td>
                </tr>
            `;
        });
    }
}

// 2. Doctor Dashboard
function updateDoctorDashboard() {
    reloadData();
    const docAppTable = document.querySelector("#doctorAppointmentsTable");
    if (!docAppTable) return;

    docAppTable.innerHTML = "";
    if (appointments.length === 0) {
        docAppTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:20px;">No appointments scheduled for today.</td></tr>`;
        return;
    }

    appointments.forEach(app => {
        docAppTable.innerHTML += `
            <tr>
                <td><strong>${app.id}</strong></td>
                <td>${app.patientName}</td>
                <td>${app.date}</td>
                <td>${formatTime(app.time)}</td>
                <td>${app.symptoms}</td>
            </tr>
        `;
    });
}

// 3. Patient Dashboard
function updatePatientDashboard() {
    reloadData();
    const patientNameEl = document.querySelector("#patientProfileName");
    if (!patientNameEl) return;

    let currentPatient = patients[0] || {
        id: "P001",
        name: "Rahul Kumar",
        age: "25",
        gender: "Male",
        phone: "9876543210",
        disease: "Fever",
        address: "New Delhi"
    };

    const idEl = document.querySelector("#patientProfileId");
    const ageEl = document.querySelector("#patientProfileAge");
    const genderEl = document.querySelector("#patientProfileGender");
    const phoneEl = document.querySelector("#patientProfilePhone");
    const diseaseEl = document.querySelector("#patientProfileDisease");
    const addressEl = document.querySelector("#patientProfileAddress");

    if (idEl) idEl.textContent = currentPatient.id;
    if (patientNameEl) patientNameEl.textContent = currentPatient.name;
    if (ageEl) ageEl.textContent = currentPatient.age;
    if (genderEl) genderEl.textContent = currentPatient.gender;
    if (phoneEl) phoneEl.textContent = currentPatient.phone;
    if (diseaseEl) diseaseEl.textContent = currentPatient.disease;
    if (addressEl) addressEl.textContent = currentPatient.address;

    const patientAppTable = document.querySelector("#patientAppointmentsTable");
    if (patientAppTable) {
        patientAppTable.innerHTML = "";
        const myAppointments = appointments.filter(a => a.patientId === currentPatient.id || a.patientName.toLowerCase() === currentPatient.name.toLowerCase());
        const displayList = myAppointments.length > 0 ? myAppointments : appointments.slice(0, 2);

        if (displayList.length === 0) {
            patientAppTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:15px;">No appointments found.</td></tr>`;
        } else {
            displayList.forEach(app => {
                patientAppTable.innerHTML += `
                    <tr>
                        <td><strong>${app.id}</strong></td>
                        <td>${app.doctor}</td>
                        <td>${app.date}</td>
                        <td>${formatTime(app.time)}</td>
                        <td>${app.symptoms}</td>
                    </tr>
                `;
            });
        }
    }

    const patientBillsTable = document.querySelector("#patientBillsTable");
    if (patientBillsTable) {
        patientBillsTable.innerHTML = "";
        const myBills = bills.filter(b => b.patientId === currentPatient.id);
        const displayBillsList = myBills.length > 0 ? myBills : bills.slice(0, 2);

        if (displayBillsList.length === 0) {
            patientBillsTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#888; padding:15px;">No bills on record.</td></tr>`;
        } else {
            displayBillsList.forEach(b => {
                patientBillsTable.innerHTML += `
                    <tr>
                        <td><strong>${b.id}</strong></td>
                        <td>${b.patientId}</td>
                        <td>₹${Number(b.treatmentCharges).toLocaleString()}</td>
                        <td>₹${Number(b.doctorCharges).toLocaleString()}</td>
                        <td><strong>₹${Number(b.total).toLocaleString()}</strong></td>
                    </tr>
                `;
            });
        }
    }
}

// 4. Report Dashboard
function updateReportDashboard() {
    reloadData();
    const repPatients = document.querySelector("#reportTotalPatients");
    const repDoctors = document.querySelector("#reportTotalDoctors");
    const repAppointments = document.querySelector("#reportTotalAppointments");
    const repRevenue = document.querySelector("#reportTotalRevenue");

    if (repPatients) repPatients.textContent = patients.length;
    if (repDoctors) repDoctors.textContent = doctors.length;
    if (repAppointments) repAppointments.textContent = appointments.length;

    if (repRevenue) {
        const totalRev = payments
            .filter(p => p.status === "Paid")
            .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        repRevenue.textContent = `₹${totalRev.toLocaleString()}`;
    }
}

// 5. Staff Dashboard
function updateStaffDashboard() {
    reloadData();
    const staffIdEl = document.querySelector("#staffProfileId");
    if (!staffIdEl) return;

    let currentStaff = staffMembers[0] || {
        id: "S001",
        name: "Sunita Rao",
        role: "Nurse",
        phone: "9876543230"
    };

    const currentUsername = localStorage.getItem(STORAGE_KEYS.USERNAME);
    if (currentUsername) {
        const matched = staffMembers.find(s =>
            s.name.toLowerCase().includes(currentUsername.toLowerCase()) ||
            currentUsername.toLowerCase().includes(s.name.toLowerCase())
        );
        if (matched) currentStaff = matched;
    }

    const nameEl = document.querySelector("#staffProfileName");
    const fullNameEl = document.querySelector("#staffProfileFullName");
    const roleEl = document.querySelector("#staffProfileRole");
    const roleTextEl = document.querySelector("#staffProfileRoleText");
    const phoneEl = document.querySelector("#staffProfilePhone");

    if (staffIdEl) staffIdEl.textContent = currentStaff.id;
    if (nameEl) nameEl.textContent = currentStaff.name;
    if (fullNameEl) fullNameEl.textContent = currentStaff.name;
    if (roleEl) roleEl.textContent = currentStaff.role;
    if (roleTextEl) roleTextEl.textContent = currentStaff.role;
    if (phoneEl) phoneEl.textContent = currentStaff.phone;
}

// Auto-fill helpers
function setupAutofillHelpers() {
    const appPatientIdInput = document.querySelector("#appointmentPatientId");
    if (appPatientIdInput) {
        appPatientIdInput.addEventListener("input", function() {
            const val = this.value.trim().toUpperCase();
            const matchedPatient = patients.find(p => p.id.toUpperCase() === val);
            if (matchedPatient) {
                const nameField = document.querySelector("#appointmentPatientName");
                const phoneField = document.querySelector("#appointmentPhone");
                if (nameField && !nameField.value) nameField.value = matchedPatient.name;
                if (phoneField && !phoneField.value) phoneField.value = matchedPatient.phone;
            }
        });
    }

    const payBillIdInput = document.querySelector("#paymentBillId");
    if (payBillIdInput) {
        payBillIdInput.addEventListener("input", function() {
            const val = this.value.trim().toUpperCase();
            const matchedBill = bills.find(b => b.id.toUpperCase() === val);
            if (matchedBill) {
                const patIdField = document.querySelector("#paymentPatientId");
                const amtField = document.querySelector("#paymentAmount");
                if (patIdField && !patIdField.value) patIdField.value = matchedBill.patientId;
                if (amtField && !amtField.value) {
                    amtField.value = matchedBill.total;
                    const totalDisplay = document.querySelector("#totalAmount");
                    if (totalDisplay) totalDisplay.textContent = `Payment Amount: ₹${matchedBill.total}`;
                }
            }
        });
    }

    const treatmentInput = document.querySelector("#treatmentCharges");
    const doctorInput = document.querySelector("#doctorCharges");
    if (treatmentInput && doctorInput) {
        treatmentInput.addEventListener("input", calculateBill);
        doctorInput.addEventListener("input", calculateBill);
    }

    const paymentAmountInput = document.querySelector("#paymentAmount");
    if (paymentAmountInput) {
        paymentAmountInput.addEventListener("input", function() {
            const val = parseFloat(this.value) || 0;
            const totalDisplay = document.querySelector("#totalAmount");
            if (totalDisplay) {
                totalDisplay.textContent = `Payment Amount: ₹${val.toLocaleString()}`;
            }
        });
    }
}

// Form Submit Attachments
function setupFormListeners() {
    const patientForm = document.querySelector("#patientForm");
    if (patientForm) {
        patientForm.addEventListener("submit", function(e) {
            e.preventDefault();
            savePatient();
        });
    }

    const doctorForm = document.querySelector("#doctorForm");
    if (doctorForm) {
        doctorForm.addEventListener("submit", function(e) {
            e.preventDefault();
            saveDoctor();
        });
    }

    const appointmentForm = document.querySelector("#appointmentForm");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            saveAppointment();
        });
    }

    // Direct public booking without login
    const publicBookingForm = document.querySelector("#publicBookingForm");
    if (publicBookingForm) {
        publicBookingForm.addEventListener("submit", handlePublicBooking);
    }

    const staffForm = document.querySelector("#staffForm");
    if (staffForm) {
        staffForm.addEventListener("submit", function(e) {
            e.preventDefault();
            saveStaff();
        });
    }

    const billForm = document.querySelector("#billForm");
    if (billForm) {
        billForm.addEventListener("submit", function(e) {
            e.preventDefault();
            saveBill();
        });
    }

    const paymentForm = document.querySelector("#paymentForm");
    if (paymentForm) {
        paymentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            savePayment();
        });
    }
}

// Central initialization on page load
document.addEventListener("DOMContentLoaded", function() {
    initializeSeedData();
    reloadData();
    setupLoginForm();
    setupFormListeners();
    setupAutofillHelpers();
    setupDynamicNavigation();
    populatePublicDoctorOptions();

    // Default booking date to tomorrow if input exists
    const pubDateInput = document.querySelector("#pubDate");
    if (pubDateInput && !pubDateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        pubDateInput.min = new Date().toISOString().split("T")[0];
        pubDateInput.value = tomorrow.toISOString().split("T")[0];
    }

    // Render table views if elements exist
    displayPatients();
    displayDoctors();
    displayAppointments();
    displayStaff();
    displayBills();
    displayPayments();

    // Render dashboard views
    updateAdminDashboard();
    updateDoctorDashboard();
    updatePatientDashboard();
    updateReportDashboard();
    updateStaffDashboard();
});
