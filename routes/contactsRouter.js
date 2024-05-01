import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import { tokenCheck } from "../helpers/tokenCheck.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", tokenCheck, getAllContacts);

contactsRouter.get("/:id", tokenCheck, getOneContact);

contactsRouter.delete("/:id", tokenCheck, deleteContact);

contactsRouter.post(
  "/",
  tokenCheck,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  tokenCheck,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  tokenCheck,
  validateBody(updateStatusContactSchema),
  updateStatus
);

export default contactsRouter;
