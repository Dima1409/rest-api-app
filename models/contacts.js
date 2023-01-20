const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find((elem) => elem.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data.findIndex((elem) => elem.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateContacts(data);
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  console.log(newContact);
  data.push(newContact);
  await updateContacts(data);
  return newContact;
}

async function updateById(id,{ name, email, phone }) {
  const data = await listContacts();
  const idx = data.findIndex((elem) => elem.id === id);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id, name, email, phone };
  await updateContacts(data);
  return data[idx];
}

// async function updateById(id, data) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((elem) => elem.id === id);
//   if (idx === -1) {
//     return null;
//   }
//   contacts[idx] = { id, name, email, phone };
//   await updateContacts(contacts);
//   return contacts[idx];
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
