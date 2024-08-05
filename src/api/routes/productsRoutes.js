const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");
const productsController = require("../controllers/products");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

router.get("/", productsController.getAllProducts); //get all products
router.get("/:id", productsController.getSingleProduct); //get single product by id
router.post("/", checkAuth, checkAdmin, upload.single("productImage"), productsController.createProduct); //create product
router.put("/:id", checkAuth, checkAdmin, upload.single("productImage"), productsController.updateProduct); //update a product by id
router.delete("/:id", checkAuth, checkAdmin, productsController.deleteProduct); //delete product by id

module.exports = router;
