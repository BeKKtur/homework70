export interface ApiContact {
    name: string;
    phone: number;
    email: string;
    image:string;
}

export interface Contacts extends ApiContact {
    [id: string];
}

export interface ApiContacts {
    [id:string]: ApiContact;
}

export interface EditContact {
    contactId: string;
    apiContact: ApiContact;
}