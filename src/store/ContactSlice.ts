import {createSlice} from "@reduxjs/toolkit";
import {addContact, deleteContact, editContact, fetchContacts, fetchOneContact} from "./ContactThunks";
import {ApiContact, Contacts} from "../types";
import {RootState} from "../app/store";

interface Contact {
    contacts: Contacts[],
    loading: boolean;
    delete: boolean | string;
    oneContact: ApiContact | null;
    fetchOneLoading: boolean;
    updateLoading: boolean;
}

const initialState:Contact = {
    contacts: [],
    loading: false,
    delete: false,
    oneContact: null,
    fetchOneLoading: false,
    updateLoading: false,
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addContact.pending, (state) => {
            state.loading = true;
        }).addCase(addContact.fulfilled, (state) => {
            state.loading = false;
        }).addCase(addContact.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(fetchContacts.pending, (state) => {
            state.loading = true;
        }).addCase(fetchContacts.fulfilled, (state, {payload: contacts}) => {
            state.contacts = contacts
            state.loading = false
        }).addCase(fetchContacts.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(deleteContact.pending,(state, action) => {
            state.delete = action.meta.arg;
        }).addCase(deleteContact.fulfilled, (state) => {
            state.delete = false;
        }).addCase(deleteContact.rejected, (state) => {
            state.delete = false;
        });
        builder.addCase(fetchOneContact.pending,(state) => {
            state.fetchOneLoading = true
        }).addCase(fetchOneContact.fulfilled,(state,{payload: oneContact}) => {
            state.oneContact = oneContact;
            state.fetchOneLoading = false;
        }).addCase(fetchOneContact.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(editContact.pending, (state) => {
            state.updateLoading = true;
        }).addCase(editContact.fulfilled, (state) => {
            state.updateLoading = false;
        }).addCase(editContact.rejected, (state) => {
            state.updateLoading = false;
        });
    }
});

export const contactReducer = contactSlice.reducer;
export const selectEditContact = (state:RootState) => state.contact.updateLoading;
export  const selectOneContact = (state:RootState) => state.contact.oneContact;
export const selectOneContactLoading = (state:RootState) => state.contact.fetchOneLoading;