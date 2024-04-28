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

import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(updateStatusContactSchema),
  updateStatus
);

export default contactsRouter;
