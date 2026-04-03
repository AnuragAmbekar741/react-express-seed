import React, { useState, useEffect } from "react";
import { type ContactT } from "./ContactApp";
import axiosInstance from "../lib/axios";

const ContactDetails: React.FC<{
  selectedContactId: string | null;
}> = ({ selectedContactId }) => {
  const [selectedContact, setSelectedContact] = useState<ContactT | null>(null);

  useEffect(() => {
    async function getContactById() {
      if (selectedContactId) {
        const resp = await axiosInstance.get(`/contacts/${selectedContactId}`);
        const respContact = resp.data.contact;
        console.log(respContact);
        setSelectedContact(respContact);
      }
    }
    getContactById();
  }, [selectedContactId]);

  if (!selectedContactId)
    return (
      <div className="flex flex-col w-1/3 gap-2 p-2 items-center justify-center text-2xl">
        No selected contact
      </div>
    );

  return (
    <div className="flex flex-col w-1/3 gap-2 p-2">
      <h1 className="text-xl font-medium py-2 text-center">Contact details</h1>
      {selectedContactId && selectedContact && (
        <div className="flex flex-col gap-1 items-center border border-slate-200 rounded-md py-2">
          <div className="flex items-center justify-between">
            <p className="text-lg">
              <span className="font-medium">Name:</span> {selectedContact.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">
              <span className="font-medium">Email:</span>{" "}
              {selectedContact.email}
            </p>
          </div>
          {selectedContact.note && (
            <div className="flex items-center justify-between">
              <p className="text-lg">
                <span className="font-medium">Note:</span>{" "}
                {selectedContact.note}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
