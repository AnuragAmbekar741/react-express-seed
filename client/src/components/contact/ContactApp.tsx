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
  const [update, setUpdate] = useState<ContactT | null>(null);
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
    <div className="flex p-5">
      <div className="w-1/3">
        <ContactForm update={update} />
      </div>
      <div className="flex w-1/3 flex-col gap-4 p-5">
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
        <div>
          {selectedContact && (
            <ContactDetails setUpdate={setUpdate} id={selectedContact} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
