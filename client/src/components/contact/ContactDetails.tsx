import React, { useEffect, useState, type SetStateAction } from "react";
import axiosInstance from "../../lib/axios";
import { type ContactT } from "./ContactApp";

const ContactDetails: React.FC<{
  id?: string;
  setUpdate: React.Dispatch<SetStateAction<ContactT>>;
}> = ({ id, setUpdate }) => {
  const [contactDetails, setContactDetails] = useState<ContactT>();
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

  if (!id) return <div>No contact selected</div>;

  return (
    <div>
      <p>{contactDetails?.name}</p>
      <p>{contactDetails?.email}</p>
      <p>{contactDetails?.note}</p>
      <div className="flex gap-2">
        <button onClick={handleDelete} className="border p-2">
          delete
        </button>
        <button
          onClick={() => setUpdate(contactDetails)}
          className="border p-2"
        >
          update
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
