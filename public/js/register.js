document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const feedback = document.getElementById('feedback');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
        try {

            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result)

            if (response.ok) {

                feedback.textContent = 'Registro exitoso. Redirigiendo...';
                feedback.classList.remove('text-red-500');
                feedback.classList.add('text-green-500');

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                feedback.textContent = result.message || 'Error al registrar el usuario.';
            }
        } catch (error) {
            console.error('Error:', error);
            feedback.textContent = 'Ocurrió un error al enviar los datos.';
        }
    });
});

