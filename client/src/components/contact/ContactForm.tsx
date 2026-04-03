import React, { useState } from "react";
import axiosInstance from "../../lib/axios";

const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      note: note,
    };
    axiosInstance.post("/contacts", {
      ...payload,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <input
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md border"
          placeholder="name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md border"
          placeholder="email"
        />
        <textarea
          onChange={(e) => setNote(e.target.value)}
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
