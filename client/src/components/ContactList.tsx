import React from "react";
import { type ContactT } from "./ContactApp";
import { useGetAllContacts } from "../hooks/useGetAllContacts";
import axiosInstance from "../lib/axios";

const ContactList: React.FC<{
  handleSelectContactId: (id: string) => void;
}> = ({ handleSelectContactId }) => {
  const { contacts, loading, fetchContacts } = useGetAllContacts();

  async function handleUpdateContact(id: string, contacted: boolean) {
    if (!id) return;
    const payload = {
      contacted: contacted,
    };
    await axiosInstance.patch(`/contacts/${id}`, payload);
    await fetchContacts();
  }

  if (loading)
    return (
      <div className="flex animate-pulse flex-col w-1/3 gap-2 p-2 items-center justify-center text-2xl">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col w-1/3 gap-2 p-2">
      <h1 className="text-xl font-medium py-2 text-center">Contact list</h1>
      {contacts &&
        contacts.length > 0 &&
        contacts.map((c: ContactT) => (
          <div
            key={c.id}
            className="w-full flex p-2 rounded-md border border-gray-200 items-center justify-between"
            onClick={() => handleSelectContactId(c.id)}
          >
            <p className="text-lg font-medium">{c.name}</p>

            <input
              type="checkbox"
              checked={c.contacted}
              className="cursor-pointer"
              onChange={async (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleUpdateContact(c.id, e.target.checked);
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default ContactList;
