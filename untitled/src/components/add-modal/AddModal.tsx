import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {ModalHotelInput} from "../modal-hotel-input/ModalHotelInput";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/Store";
import {addHotel} from "../../features/HotelsSlice";

interface EditModalProps {
}

export const AddModal = forwardRef<HTMLDialogElement, EditModalProps>((props, ref) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [localCategory, setLocalCategory] = useState('');

    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const dispatch: AppDispatch = useDispatch();

    const handleAddButtonClick = () => {
        dispatch(addHotel({
            name: name,
            localCategory: Number(localCategory),
            location: location,
            longDescription: description,
            pricePerRoom: Number(price)
        }));

        innerRef.current?.close()
    }

    return (
        <dialog ref={innerRef}>
            <form method="dialog" onSubmit={e => e.preventDefault()}>
                <section className='dialogX'>
                    <button onClick={() => innerRef.current?.close()}>
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
                    <button className='button secondary' onClick={() => innerRef.current?.close()}>
                    Cancel
                    </button>
                    <button className='button primary' onClick={handleAddButtonClick}>
                        Add
                    </button>
                </section>
            </form>
        </dialog>
    )
});
