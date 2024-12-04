import { Router } from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'


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

viewRouter.get('/admin', (req, res) => {
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

viewRouter.get('/')




export default viewRouter