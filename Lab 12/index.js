document.addEventListener("DOMContentLoaded", loadContacts);

const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const contactIndex = document.getElementById("contactIndex").value;

    if (contactIndex === "") {
       
        contacts.push({ name, phone, email, address });
    } else {
        
        contacts[contactIndex] = { name, phone, email, address };
        document.getElementById("contactIndex").value = "";
        document.getElementById("saveButton").textContent = "Guardar Contacto";
    }

    saveContacts();
    loadContacts();
    contactForm.reset();
});

function loadContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        const contactCard = document.createElement("div");
        contactCard.className = "contact-card";

        const contactInfo = document.createElement("div");
        contactInfo.className = "contact-info";
        contactInfo.innerHTML = `
            <strong>${contact.name}</strong><br>
            Tel: ${contact.phone}<br>
            Email: ${contact.email}<br>
            Dirección: ${contact.address}
        `;

        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.textContent = "Editar";
        editButton.onclick = () => editContact(index);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteContact(index);

        contactCard.appendChild(contactInfo);
        contactCard.appendChild(editButton);
        contactCard.appendChild(deleteButton);
        contactList.appendChild(contactCard);
    });
}

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    document.getElementById("address").value = contact.address;
    document.getElementById("contactIndex").value = index;
    document.getElementById("saveButton").textContent = "Actualizar Contacto";
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    loadContacts();
}
