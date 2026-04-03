import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../lib/axios";
import { type ContactT } from "../components/ContactApp";
import { useDebouce } from "./useDebounce";

export const useGetAllContacts = (query: string) => {
  const [contacts, setContacts] = useState<ContactT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouceValue = useDebouce(query, 1000);
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const url = query.trim()
        ? `/contacts/search?q=${debouceValue}`
        : "/contacts";
      const response = await axiosInstance.get(url);
      const respContacts = await response.data.contacts;
      setContacts(respContacts);
      return respContacts;
    } catch (err) {
      console.error("Failed to fetch contact", err);
    } finally {
      setLoading(false);
    }
  }, [debouceValue]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return { contacts, loading, fetchContacts };
};
