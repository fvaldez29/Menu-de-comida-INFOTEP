import { Router } from 'express'

const viewRouter = Router()

viewRouter.get('/login', (req, res) => {
    res.render('index', { title: "Login", user: req.user })
})

viewRouter.get('/register', (req, res) => {
    res.render('pages/register', {title: 'Register Form'})
})

viewRouter.get('/reset-password', (req, res) => {
    res.render('pages/reset-password', { title: 'Reset password' })
})

export default viewRouter