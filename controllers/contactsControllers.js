import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updatedContact,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { Types } from "mongoose";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idIsValid = Types.ObjectId.isValid(id);
    if (!idIsValid) throw HttpError(404, "User not found..");

    const result = await getContactById(id);
    if (!result) throw HttpError(404);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idIsValid = Types.ObjectId.isValid(id);
    if (!idIsValid) throw HttpError(404, "User not found..");

    const result = await removeContact(id);
    if (!result) throw HttpError(404);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idIsValid = Types.ObjectId.isValid(id);
    if (!idIsValid) throw HttpError(404, "User not found..");

    if (Object.keys(req.body).length === 0) {
      throw HttpError(404, "Body must have at least one field");
    }
    const result = await updatedContact(id, req.body);
    if (!result) throw HttpError(404);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const idIsValid = Types.ObjectId.isValid(contactId);
    if (!idIsValid) throw HttpError(404, "User not found..");

    const { favorite } = req.body;
    const result = await updateStatusContact(contactId, { favorite });
    if (!updatedContact) throw HttpError(404);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
