document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura los datos del formulario
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    console.log('Datos enviados:', data);

    // Verifica que los campos necesarios no estén vacíos
    const { teacherId, password } = data;
    if (!teacherId || !password) {
        return alert('Por favor, ingresa el ID y la contraseña.');
    }

    try {
        // Realiza la solicitud al backend
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convierte los datos a JSON
        });

        // Maneja la respuesta del servidor
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const result = await response.json();
        console.log('Respuesta del servidor:', result);

        // Guarda el token y el rol en localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);

        // Redirige según el rol del usuario
        if (result.role === 'admin') {
            window.location.href = '/admin'; // Ruta para admins
        } else {
            window.location.href = '/market'; // Ruta para usuarios normales
        }

    } catch (error) {
        console.error('Error en el login:', error.message);
        alert('Error: ' + error.message);
    }
});
