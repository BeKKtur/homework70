import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiContact, ApiContacts, Contacts, EditContact} from "../types";
import axiosApi from "../axiosApi";

export const addContact = createAsyncThunk<void, ApiContact>(
    'contact/addContact',
    async (addNewContact) => {
        await axiosApi.post('/contacts.json', addNewContact)
    }
);

export const fetchContacts = createAsyncThunk<Contacts[]>(
    'contact/fetchContact',
    async () => {
        const {data: contact} = await axiosApi.get<ApiContacts | null>('/contacts.json');
        if (!contact) {
            return [];
        }
        return  Object.keys(contact).map(id => ({
            ...contact[id],
            id
        }));
    }
);

export const deleteContact = createAsyncThunk<void, string>(
    'contact/deleteContact',
    async (id:string) => {
        await axiosApi.delete(`/contacts/${id}.json`);
    }
);

export const fetchOneContact = createAsyncThunk<ApiContact, string>(
    'contact/fetchOne',
    async (contactId) => {
        const {data: contact} = await axiosApi.get(`/contacts/${contactId}.json`);
        if (contact === null) {
            throw new Error('Not found');
        }
        return contact;
    }
)

export const editContact = createAsyncThunk<void, EditContact>(
    'contact/editContact',
    async (contactId,apiContact) => {
        await axiosApi.put(`/contacts/${contactId}.json`, apiContact)
    }
)