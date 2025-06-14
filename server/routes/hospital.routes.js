const router = require('express').Router();
const { protect, isSuperAdmin } = require('../middleware/auth.middleware');
const {
    createHospital,
    getHospitals,
    getHospitalById,
    updateHospital,
    deleteHospital,
    changeHospitalRole,
    hospitalSignup,
    hospitalSignin 
} = require('../controllers/hospital.controller');

router.post('/', protect, isSuperAdmin, createHospital);
router.get('/', protect, isSuperAdmin, getHospitals);
router.get('/:id', protect, isSuperAdmin, getHospitalById);
router.put('/:id', protect, isSuperAdmin, updateHospital);
router.delete('/:id', protect, isSuperAdmin, deleteHospital);
router.put('/:id/changerole', protect, isSuperAdmin, changeHospitalRole);

router.post('/signup', hospitalSignup); 
router.post('/signin', hospitalSignin); 

module.exports = router;
