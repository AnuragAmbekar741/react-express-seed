import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { type ContactT } from "./ContactApp";
import ContactForm from "./ContactForm";

const ContactDetails: React.FC<{ id?: string }> = ({ id }) => {
  const [contactDetails, setContactDetails] = useState<ContactT>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const response = await axiosInstance.get(`/contacts/${id}`);
        setContactDetails(response?.data?.contact);
      };
      fetchContact();
    }
  }, [id]);

  const handleDelete = async () => {
    await axiosInstance.delete(`/contacts/${id}`);
  };

  const handleUpdate = async () => {
    await axiosInstance.patch(`/contacts/${id}`);
  };
  if (!id) return <div>No contact selected</div>;

  return (
    <div>
      {isUpdating ? (
        <ContactForm />
      ) : (
        <>
          <p>{contactDetails?.name}</p>
          <p>{contactDetails?.email}</p>
          <p>{contactDetails?.note}</p>
          <div className="flex gap-2">
            <button onClick={handleDelete} className="border p-2">
              delete
            </button>
            <button onClick={() => setIsUpdating(true)} className="border p-2">
              update
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactDetails;
