import {Router} from 'express'
import {getUsuarios, getusuarioxid, postUsuario, putUsuario} from '../controladores/usuarios.Ctrl.js'
const router=Router()
// armar nuestras rutas

router.get('/usuarios', getUsuarios) //select
router.get('/usuarios/:id', getusuarioxid) //select x id
router.post('/usuarios', postUsuario) //insert
router.put('/usuarios/:id', putUsuario) //update

export default router