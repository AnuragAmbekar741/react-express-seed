import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import type { ContactT } from "./ContactApp";

const ContactForm: React.FC<{ update: ContactT | null }> = ({ update }) => {
  const [contact, setContact] = useState<ContactT>({
    name: "",
    email: "",
    note: "",
    id: "",
  });

  useEffect(() => {
    if (!update) return;
    setContact(update);
  }, [update]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance.post("/contacts", {
      ...contact,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <input
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          className="p-2 rounded-md border"
          placeholder="name"
        />
        <input
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="p-2 rounded-md border"
          placeholder="email"
        />
        <textarea
          value={contact.note}
          onChange={(e) => setContact({ ...contact, note: e.target.value })}
          className="p-2 rounded-md border"
          placeholder="note"
        />
        <button type="submit" className="p-2 border">
          Add
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
