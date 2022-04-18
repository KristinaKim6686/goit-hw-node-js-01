const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { dir } = require("console");

contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  //   console.table(allContacts);
  return allContacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactToFind = allContacts.find((el) => el.id === contactId);
  if (!contactToFind) {
    console.log(` contact with id ${contactId} havent been found`);
    return;
  }
  console.log(`contact`, contactToFind);
  return contactToFind;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactToDelete = allContacts.find((el) => {
    return el.id === contactId;
  });
  const actualizedContacts = allContacts.filter((el) => {
    return el.id !== contactId;
  });
  await fs.writeFile(contactsPath, JSON.stringify(actualizedContacts));
  console.log(contactToDelete);
  return contactToDelete;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const actualizedContacts = [
    ...allContacts,
    {
      id: nanoid(),
      name,
      email,
      phone,
    },
  ];
  await fs.writeFile(contactsPath, JSON.stringify(actualizedContacts));

  console.table(actualizedContacts);
  return actualizedContacts;
}

const operations = { listContacts, getContactById, removeContact, addContact };

module.exports = operations;
