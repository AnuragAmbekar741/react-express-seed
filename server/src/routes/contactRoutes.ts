import { Router } from "express";
import {
  addContact,
  getContacts,
  getContact,
  deleteContact,
  updateContact,
} from "../controllers/contactController";

const router = Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);

router.post("/", addContact);

router.patch("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);

export default router;
