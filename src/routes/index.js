const { Router } = require('express');

// Importa los routers individuales
const companyRouter = require('../routes/companyRouter/companyRouter');
const postsRouter = require('../routes/postsRouter/postsRouter');
const commentRouter = require('../routes/commentsRouter/commentsRouter');
const usersRouter = require('../routes/usersRouter/usersRouter');
const authRouter = require('../routes/authRouter/authRouter');
const devDataRouter = require('../routes/devDataRouter/devDataRouter')
const mercadoPagoRouter = require('../routes/mercadoPagoRouter/mercadoPagoRouter');
const confirmEmailRouter = require('../routes/confirmEmailRouter/confirmEmailRouter')
const resetPasswordRouter = require('../routes/resetPasswordRouter/resetPasswordRouter')
const adminRouter = require('../routes/adminRouter/adminRouter')

const router = Router();

// Agrega los routers al enrutador principal
router.use('/company', companyRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentRouter);
router.use('/mercadoPago', mercadoPagoRouter);
router.use('/users', usersRouter)
router.use('/devdata', devDataRouter)
router.use('/confirm', confirmEmailRouter)
router.use('/resetpassword', resetPasswordRouter)
router.use('/admin', adminRouter)


// Autenticación con google
router.use("/auth", authRouter);

// Agrega más routers si es necesario



module.exports = router;