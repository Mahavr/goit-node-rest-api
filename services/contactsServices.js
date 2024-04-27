import { promises as fs } from "fs";
import { v4 } from "uuid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const removedContact = contacts.find((item) => item.id === contactId);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

  return removedContact || null;
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const newContacts = {
    id: v4(),
    name,
    email,
    phone,
  };
  const updateContacts = [...contacts, newContacts];
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return newContacts;
}
export async function updatedContact(id, { name, email, phone }) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const updateContact = {
    id: contacts[index].id,
    name: name || contacts[index].name,
    email: email || contacts[index].email,
    phone: phone || contacts[index].phone,
  };
  contacts[index] = updateContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
