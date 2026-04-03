import React, { useState } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

export interface ContactT {
  id: string;
  name: string;
  email: string;
  note: string;
  contacted: boolean;
  createdAt: string;
  updatedAt: string;
}

const ContactApp: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  function handleSelectContactId(id: string) {
    setSelectedContactId(id);
  }

  return (
    <div className="flex w-full p-10">
      {/* contact form */}
      <ContactForm />

      {/* contact list */}
      <ContactList handleSelectContactId={handleSelectContactId} />

      {/* contact details */}
      <ContactDetails selectedContactId={selectedContactId} />
    </div>
  );
};

export default ContactApp;
