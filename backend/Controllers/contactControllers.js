const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

//@desc get all contacts
//@route GET /api/contacts

// const { get } = require("mongoose");

//@access public
const getContacts = asyncHandler (async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});


  res.json(contacts);
});

//@desc hämta kontakt med id
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});


//@desc Create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler (async (req, res) => {
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    
    //create contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    
    res.status(201).json(contact);
});

//@desc remove kontakt med id
//@route Delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler (async(req, res) => {
 const contact = await Contact.findById(req.params.id);

  await Contact.deleteOne({ _id: req.params.id });
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
}
await Contact.deleteOne({ _id: req.params.id });
res.status(200).json(contact);
});

//@desc update kontakt med id
//@route Update /api/contacts/:id
//@access public
const updateContact = asyncHandler (async(req, res) => {
  const contact = await Contact.findById(req.params.id);
 
 
 if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
    }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact
};