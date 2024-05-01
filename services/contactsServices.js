import { Contact } from "../models/contactModel.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtService.js";
export async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contactsList = await Contact.find();
  return contactsList;
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

  const contacts = await Contact.findById(contactId);
  return contacts;
}

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

  const removedContact = await Contact.findByIdAndDelete(contactId);
  return removedContact;
}

export async function addContact(...args) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const newContact = new Contact(...args);
  return await newContact.save();
}
export async function updatedContact(id, body) {
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  return updatedContact;
}
export async function updateStatusContact(id, body) {
  const { favorite } = body;

  const updatedStatus = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  return updatedStatus;
}

export async function signupUser(body) {
  const newUser = await User.create(body);
  newUser.password = undefined;

  return newUser;
}


export async function checkEmail(email) {
  const result = await User.findOne({ email });
  return result;

}

























