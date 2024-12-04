const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return; 
    }

 
    const data = Object.fromEntries(new FormData(e.target));

    const port = 8080 || 3000; 

    try {
        const response = await fetch(`http://localhost:${port}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('role', result.role)

            alert("Registro exitoso! Redirigiendo a la página de login.");
            window.location.href = "/login";
        } else {
            alert(result.message || "Hubo un error, por favor intente nuevamente.");
        }
    } catch (error) {
        console.error("Error de registro:", error);
        alert("Error al registrar, intente nuevamente más tarde.");
    }
});
