import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

export interface ContactT {
  id: string;
  name: string;
  email: string;
  note?: string;
}

const ContactApp: React.FC = () => {
  const [contacts, setContacts] = useState<ContactT[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>("");

  const handleSelect = (id: string) => setSelectedContact(id);

  useEffect(() => {
    const fetchContact = async () => {
      const contact = await axiosInstance.get("/contacts");
      if (contact.data.contact.length > 0) {
        setContacts(contact.data.contact);
      }
      console.log(contact.data.contact);
    };
    fetchContact();
  }, []);

  return (
    <div className="flex">
      <div className="flex w-1/3 flex-col gap-4 p-5">
        <ContactForm />
        {contacts &&
          contacts.length > 0 &&
          contacts.map((c) => (
            <Contact
              handleSelect={handleSelect}
              key={c.id}
              name={c.name}
              id={c.id}
            />
          ))}
      </div>
      <div>
        <p>Contact details</p>
        <div>{selectedContact && <ContactDetails id={selectedContact} />}</div>
      </div>
    </div>
  );
};

export default ContactApp;
