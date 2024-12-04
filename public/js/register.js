document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const feedback = document.getElementById('feedback');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir que se recargue la página

        // Crear un objeto con los datos del formulario
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        try {
            // Hacer la petición al backend
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result)

            if (response.ok) {
                // Si el registro fue exitoso
                feedback.textContent = 'Registro exitoso. Redirigiendo...';
                feedback.classList.remove('text-red-500');
                feedback.classList.add('text-green-500');

                // Redirigir después de unos segundos
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                // Si hubo un error
                feedback.textContent = result.message || 'Error al registrar el usuario.';
            }
        } catch (error) {
            console.error('Error:', error);
            feedback.textContent = 'Ocurrió un error al enviar los datos.';
        }
    });
});
