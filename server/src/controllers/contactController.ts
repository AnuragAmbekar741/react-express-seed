import { Request, Response } from "express";
import { CreateContacts } from "../db/schema";
import db from "../db/connection";
import { contacts } from "../db/schema";
import { eq } from "drizzle-orm";

export const addContact = async (
  req: Request<any, any, CreateContacts>,
  res: Response
) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);
    const addedContact = await db
      .insert(contacts)
      .values({
        name,
        email,
      })
      .returning();

    res.status(201).json({
      message: "Contact added",
      contact: addedContact,
    });
  } catch (err) {
    console.error("Something went wrong!", err);
    res.status(500).json({ error: "Something went wrong!", message: err });
  }
};

export const getContacts = async (
  req: Request<any, any, CreateContacts>,
  res: Response
) => {
  try {
    const allContacts = await db.query.contacts.findMany();
    res.status(200).json({
      message: "All contacts added",
      contact: allContacts,
    });
  } catch (err) {
    console.error("Something went wrong!", err);
    res.status(500).json({ error: "Something went wrong!", message: err });
  }
};

export const getContact = async (
  req: Request<any, any, CreateContacts>,
  res: Response
) => {
  try {
    const { contactId } = req.params;
    const allContacts = await db.query.contacts.findFirst({
      where: eq(contacts.id, contactId),
    });
    res.status(200).json({
      message: "All contacts added",
      contact: allContacts,
    });
  } catch (err) {
    console.error("Something went wrong!", err);
    res.status(500).json({ error: "Something went wrong!", message: err });
  }
};

export const updateContact = async (
  req: Request<any, any, CreateContacts>,
  res: Response
) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await db
      .update(contacts)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(contacts.id, contactId))
      .returning();
    res.status(200).json({
      message: "Contact updated",
      contact: updatedContact,
    });
  } catch (err) {
    console.error("Something went wrong!", err);
    res.status(500).json({ error: "Something went wrong!", message: err });
  }
};

export const deleteContact = async (
  req: Request<any, any, CreateContacts>,
  res: Response
) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning();

    res.status(200).json({
      message: "contacts deleted",
      contact: deletedContact,
    });
  } catch (err) {
    console.error("Something went wrong!", err);
    res.status(500).json({ error: "Something went wrong!", message: err });
  }
};
