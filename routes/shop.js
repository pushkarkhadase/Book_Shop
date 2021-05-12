const express = require('express');

const router = express.Router();

const shopController = require('../controller/shop');

router.get('/', shopController.homePage);
router.get('/products' , shopController.productPage);
router.get('/addProducts' , shopController.addProducts);
router.post('/addProducts', shopController.postAddProducts);
router.get('/editProduct/:productId', shopController.getEditProduct);
router.post('/editProduct', shopController.postEditProduct);
router.get('/productDetails/:productId', shopController.getProductDetails);
router.get('/deleteProduct/:productId', shopController.getDeleteProduct);


module.exports = router;