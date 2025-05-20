const express = require('express');
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.get("/", (req, res) => {
//   res.json({ message: "get all contacts" });
// });
// router.post("/", (req, res) => {
//   res.json({ message: "get all contacts" });
// });
// router.get("/:id", (req, res) => {
//   res.json({ message: "get all contacts" });
// });
// router.put("/", (req, res) => {
//   res.json({ message: "get all contacts" });
// });
// router.delete("/", (req, res) => {
//   res.json({ message: "get all contacts" });
// });

module.exports = router;

