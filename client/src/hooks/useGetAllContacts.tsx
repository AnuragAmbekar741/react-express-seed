import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import { type ContactT } from "../components/ContactApp";

export const useGetAllContacts = () => {
  const [contacts, setContacts] = useState<ContactT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchContacts() {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/contacts");
      const respContacts = await response.data.contact;
      setContacts(respContacts);
      return respContacts;
    } catch (err) {
      console.error("Failed to fetch contact", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, loading, fetchContacts };
};
