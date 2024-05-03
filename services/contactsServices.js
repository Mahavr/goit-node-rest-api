import { Contact } from "../models/contactModel.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtService.js";
import { v4 } from "uuid";
export async function listContacts(req) {
  // ...твій код. Повертає масив контактів.
  const { _id: owner } = req.user;
  const contactsList = await Contact.find({ owner }).populate("owner", "email");
  return contactsList;
}

export async function getContactById(req, contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const { _id: owner } = req.user;
  const contacts = await Contact.findOne({ _id: contactId, owner });
  return contacts;
}

export async function removeContact(req, contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const { _id: owner } = req.user;
  const removedContact = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  });
  return removedContact;
}

export async function addContact(...args) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const newContact = new Contact(...args);
  return await newContact.save();
}

export async function updatedContact(req, id, body) {
  const { _id: owner } = req.user;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    body,
    {
      new: true,
    }
  );

  return updatedContact;
}
export async function updateStatusContact(req, id, body) {
  const { favorite } = body;
  const { _id: owner } = req.user;
  const updatedStatus = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
  return updatedStatus;
}

export async function signupUser(body) {
  const verificationToken = v4();
  const newUser = await User.create({ ...body, verificationToken });

  newUser.password = undefined;

  return { newUser, verificationToken };
}

export async function checkEmail(email) {
  const result = await User.findOne({ email });
  return result;
}
