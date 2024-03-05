import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ApiContact} from "../types";
import {addContact, editContact} from "../store/ContactThunks";
import Spinner from "./Spinner";

const AddContact = () => {
    const [contactData, setContact] = useState<ApiContact>({
        name: '',
        phone: 0,
        email: '',
        image: '',

    });

    const loading = useAppSelector(state => state.contact.loading);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const oneContact = useAppSelector(state => state.contact.oneContact);

    const onSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const contact:ApiContact = {
            name: contactData.name,
            phone: contactData.phone,
            email: contactData.email,
            image: contactData.image
        };
        dispatch(addContact(contact));
    }

    const onChange = (e:React.ChangeEvent <HTMLInputElement>) => (
        setContact(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    );
    const onEditSubmit = async (apiContact:ApiContact) => {
        if (id){
            await dispatch(editContact({contactId: id, apiContact}));
        }
    };

    return loading ? <Spinner/> : (
        <>
            <form className='container-fluid text-lg-start mt-3' onSubmit={id? () => onEditSubmit : onSubmit}>
                <h2 className="mb-3">Add new contact</h2>
                <div>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        className="form-control mb-3"
                        required
                        placeholder='Name'
                        value={id?  oneContact?.name : contactData.name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="form-control mb-3"
                        required
                        placeholder='Phone number'
                        value={contactData.phone}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control mb-3"
                        required
                        placeholder='email'
                        value={id?  oneContact?.email : contactData.email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        className="form-control mb-3"
                        placeholder='image'
                        required
                        value={id?  oneContact?.image : contactData.image}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <img src={id?  oneContact?.image : contactData.image} alt="photo" className='image mb-3'/>
                </div>
                <div className='d-flex align-items-center gap-2 flex-wrap'>
                    <button type="submit" className="btn btn-success">Safe</button>
                    <Link to='/' className='btn btn-primary'>back to contact</Link>
                </div>
            </form>
        </>
    );
};

export default AddContact;