
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });


    const logout = document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')

        window.location.href = '/login'
    })