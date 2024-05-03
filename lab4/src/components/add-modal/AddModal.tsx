import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {ModalHotelInput} from "../modal-hotel-input/ModalHotelInput";
import {useDispatch} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {containerIds} from "../../utils/ToastifyContainerIds";
import {validateAddEditData} from "../../utils/validation";
import {getAuth} from "firebase/auth";
import {addHotel} from "../../firebase/HotelQuerries";
import {incrementUserEditions} from "../../features/HotelsSlice";

interface EditModalProps {
}

export const AddModal = forwardRef<HTMLDialogElement, EditModalProps>((props, ref) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [localCategory, setLocalCategory] = useState('');
    const auth = getAuth();
    const dispatch = useDispatch();

    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const clearInput = () => {
        setName('');
        setDescription('');
        setLocation('');
        setPrice('');
        setLocalCategory('');
    }

    const handleAddButtonClick = async () => {
        const validation = validateAddEditData(name, description, location, price, localCategory);

        if (auth.currentUser === null) {
            toast('Log in to add hotel', {type: 'error', containerId: containerIds.addModal });
            return;
        }

        if (validation.valid) {

            await addHotel(
                {
                    name: name,
                    description: description,
                    pricePerRoom: Number(price),
                    location: location,
                    localCategory: Number(localCategory)
                },
                auth.currentUser.uid)

            toast('Hotel added successfully', {containerId: containerIds.main});
            dispatch(incrementUserEditions())
            handleClose();
        } else {
            toast(validation.messages, {type: 'error', containerId: containerIds.addModal });
        }

    }

    const handleClose = () => {
        toast.dismiss({containerId: containerIds.addModal})
        innerRef.current?.close()
        clearInput();
    }

    return (
        <dialog ref={innerRef} onClose={handleClose}>
            <form method="dialog" onSubmit={e => e.preventDefault()}>
                <section className='dialogX'>
                    <button onClick={handleClose}>
                        <img src="/assets/icons/cancel.svg" alt="Cancel icon"/>
                    </button>
                </section>
                <p className='dialogHeader'>Add new offer</p>
                <ModalHotelInput name={name}
                                 onNameChange={e => setName(e.target.value)}
                                 description={description}
                                 onDescriptionChange={e => setDescription(e.target.value)}
                                 location={location}
                                 onLocationChange={e => setLocation(e.target.value)}
                                 price={price}
                                 onPriceChange={e => setPrice(e.target.value)}
                                 localCategory={localCategory}
                                 onLocalCategoryChange={e => setLocalCategory(e.target.value)} />
                <section className='dialogButtonContainer'>
                    <button className='button secondary' onClick={handleClose}>
                    Cancel
                    </button>
                    <button className='button primary' onClick={handleAddButtonClick}>
                        Add
                    </button>
                </section>
            </form>
            <ToastContainer containerId={containerIds.addModal} position='bottom-right'/>
        </dialog>
    )
});
