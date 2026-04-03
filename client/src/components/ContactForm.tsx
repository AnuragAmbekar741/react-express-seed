import React, { useState } from "react";
import axiosInstance from "../lib/axios";
import { type ContactT } from "./ContactApp";

const ContactForm: React.FC = () => {
  const [contact, setContact] = useState<Partial<ContactT>>({
    name: "",
    email: "",
    note: "",
    contacted: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (contact.email?.trim() != "" && contact.name?.trim() !== "") {
      const response = await axiosInstance.post("/contacts", { ...contact });
      console.log(response);
    }
  }
  return (
    <div className="flex flex-col w-1/3 gap-2 p-2">
      <h1 className="text-xl font-medium py-2 text-center">Contact form</h1>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <input
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          placeholder="name"
          className="px-3 py-1.5 border border-slate-200"
        />
        <input
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="email"
          className="px-3 py-1.5 border border-slate-200"
        />
        <textarea
          value={contact.note}
          onChange={(e) => setContact({ ...contact, note: e.target.value })}
          placeholder="note"
          className="px-3 py-1.5 border border-slate-200"
        />
        <input type="submit" className="px-3 py-1.5 border border-slate-200" />
      </form>
    </div>
  );
};

export default ContactForm;
