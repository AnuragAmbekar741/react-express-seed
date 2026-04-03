import { Router } from "express";
import {
  addContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
} from "../controllers/contactController";
import { validatePayload } from "../middlewares/validations";
import { z } from "zod";

const CreateContactSchema = z.object({
  name: z.string(),
  email: z.email(),
});

const router = Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);

router.post("/", validatePayload(CreateContactSchema), addContact);

router.patch("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

export default router;
