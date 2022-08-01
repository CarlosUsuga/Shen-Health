const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');
const { rolValido, emailValido, userValidoID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userValidoID),
    check('rol').custom(rolValido),
    validarCampos
], usersPut);

router.post('/', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser obligatoria y mayor a 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailValido),
    //check('role', 'Este rol no es valido').isIn('SUPER_USER_ADMIN_ROLE', 'ADMIN_ROLE', 'USER_ROLE'),
    check('rol').custom(rolValido),
    validarCampos
], usersPost)

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userValidoID),
    validarCampos
], usersDelete);

module.exports = router;