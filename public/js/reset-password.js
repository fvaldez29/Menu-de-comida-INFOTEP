document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    if (!email) {
        alert('Por favor ingresa tu correo electrónico.');
        return;
    }

    
    try {
        const response = await fetch('http://localhost:8080/api/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                alert('Se ha enviado un enlace para recuperar tu contraseña a tu correo electrónico.');
                window.location.href = '/login';
            } else {
                alert('Hubo un problema con la solicitud. Intenta de nuevo.');
            }
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al enviar la solicitud.');
        }
    } catch (error) {
        console.error('Error de recuperación de contraseña:', error.message);
        alert('Error: ' + error.message);
    }
});
