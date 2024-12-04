import { Router } from 'express'

const viewRouter = Router()

viewRouter.get('/login', (req, res) => {
    res.render('index', { title: "Login", user: req.user })
})


export default viewRouter