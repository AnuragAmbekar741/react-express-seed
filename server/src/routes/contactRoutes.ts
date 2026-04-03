import { Router } from "express";
import {
  addContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  searchContact,
} from "../controllers/contactController";
import { validatePayload, validateQuery } from "../middlewares/validations";
import { z } from "zod";

const CreateContactSchema = z.object({
  name: z.string(),
  email: z.email(),
  note: z.string().optional(),
});

const SearchContactSchema = z.object({
  q: z.string().toLowerCase(),
});

const router = Router();

router.get("/", getContacts);
router.get("/search", validateQuery(SearchContactSchema), searchContact);
router.get("/:contactId", getContact);

router.post("/", validatePayload(CreateContactSchema), addContact);

router.patch("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

export default router;
