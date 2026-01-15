const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Kullanıcı routes
router.get('/users', adminController.getAllUsers);

// Ürün routes
router.get('/products', adminController.getAllProducts);
router.post('/products', adminController.createProduct);
router.delete('/products/:id', adminController.deleteProduct);

module.exports = router;
