import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useEffect, useState} from "react";
import {deleteContact, fetchContacts, fetchOneContact} from "../store/ContactThunks";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";

const Contacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(state => state.contact.contacts);
    const loading = useAppSelector(state => state.contact.loading);
    const oneContact = useAppSelector(state => state.contact.oneContact);
    const [modal, setModal] = useState(false);



    const onClick = async (id:string) => {
        setModal(!modal);
        await dispatch(fetchOneContact(id));
    }

    const removeContact = async (id:string) => {
        await dispatch(deleteContact(id));
        await dispatch(fetchContacts());
    }
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    console.log(oneContact)

    return loading ? <Spinner/> : (
        <div className="container-fluid">
            {contacts.map(contact => (
                <div key={contact.id} className='cards d-flex align-items-center gap-3'
                     onClick={() => onClick(contact.id)}>
                    <img src={contact.image} alt="photo" className='image'/>
                    <h1 className=''>{contact.name}</h1>
                    {modal && (
                        <div className='modall'>
                            <div className='modal_box'>
                                <button onClick={() => onClick(contact.id)} className='btn btn-secondary'>close</button>
                                <div className='modal_card'>
                                    <img src={oneContact?.image} alt="photo" className='image'/>
                                    <div>
                                        <h3>{oneContact?.name}</h3>
                                        <p>{oneContact?.image}</p>
                                        <p>{oneContact?.phone}</p>
                                        <div className='d-flex align-items-center gap-3'>
                                            <Link to={'/contacts/' + contact.id + '/edit'} className='btn btn-primary'>Edit</Link>
                                            <button onClick={() => removeContact(contact.id)}
                                                    className='btn btn-danger'>Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            ))}

        </div>
    );
};

export default Contacts;