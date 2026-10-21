document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    const users = {

        admin: {username: "admin",password: "admin123",page: "admin.html"},

        doctor: {username: "doctor",password: "doctor123",page: "doctor.html"},

        staff: {username: "staff",password: "staff123",page: "staff.html"},

        patient: {username: "patient",password: "patient123",page: "patient.html"},

        payment: {username: "payment",password: "payment123",page: "payment.html"}
    };
    if (role === "appointment") {
         window.location.href = "appointment.html";
        return;
    }
    if (
        users[role] && users[role].username === username && users[role].password === password
    ) { localStorage.setItem("role", role);
        window.location.href = users[role].page;
    } else {
        error.textContent = "Invalid Information";
    }
});
