import { Router } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import authToken from '../middleware/authToken.js'


const viewRouter = Router()

// AUTH ROUTE

viewRouter.get('/login', (req, res) => {
    res.render('index', { title: "Inicio de sesión", user: req.user, layout: 'layouts/auth' })
})

viewRouter.get('/register', async(req, res) => {
    res.render('pages/register', {title: 'Formulario de registro', layout: 'layouts/auth'})

})

viewRouter.get('/reset-password', (req, res) => {
    res.render('pages/reset-password', { title: 'Restaura contraseña', layout: 'layouts/auth' })
})

// ADMIN ROUTE

viewRouter.get('/admin',  (req, res) => {
    res.render('pages/dashboard', {
        title: 'Protected - admin',
        user: req.user, 
        layout: 'layouts/protected', 
    });
});

viewRouter.get('/list-menu', (req, res) => {
    res.render('pages/list-menu', {
        title: 'Protected - admin',
        user: req.user,
        layout: 'layouts/protected'
    })
})

viewRouter.get('/list-users', (req, res) => {
    res.render('pages/list-users', {
        title: 'Protected - admin',
        user: req.user,
        layout: 'layouts/protected'
    })
})

// USER ROUTE

viewRouter.get('/market', (req, res) => {
    res.render('pages/market', {
        title: 'Market',
        user: req.user,
        layout: 'layouts/main'
    })
})

viewRouter.get('/market/profile', (req, res) => {
    res.render('pages/profile', {
        title: "Market - Profile",
        user: req.user,
        layout: 'layouts/main'
    })
})

viewRouter.get('/market/log', (req, res) => {
    res.render('pages/historial', {
        title: "Market - Historial",
        user: req.user,
        layout: 'layouts/main'
    })
})



export default viewRouter