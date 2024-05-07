import {forwardRef, useImperativeHandle, useRef} from "react";
import {ModalHotelInput} from "../modal-hotel-input/ModalHotelInput";
import {useDispatch, useSelector} from "react-redux";
import {editedHotelSelector, incrementUserEditions, updateEdited} from "../../features/HotelsSlice";
import {AppDispatch} from "../../app/Store";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {containerIds} from "../../utils/ToastifyContainerIds";
import {validateAddEditData} from "../../utils/validation";
import {updateHotel} from "../../firebase/HotelQuerries";

interface EditModalProps {
}

export const EditModal = forwardRef<HTMLDialogElement, EditModalProps>((props, ref) => {
    const editedHotel = useSelector(editedHotelSelector);
    const dispatch: AppDispatch = useDispatch();
    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const handleSubmit = async () => {
        if (!editedHotel) {
            return;
        }
        const validation = validateAddEditData(
            editedHotel?.name || '',
            editedHotel?.longDescription || '',
            editedHotel?.location || '',
            editedHotel?.price.toString() || '',
            editedHotel?.localCategory.toString() || '',
        );

        if (validation.valid) {
            await updateHotel(editedHotel);
            dispatch(incrementUserEditions());
            handleClose();
            toast('Hotel edited successfully', {containerId: containerIds.main});
        } else {
            toast(validation.messages, {containerId: containerIds.editModal, type: 'error'});
        }
    };

    const handleClose = () => {
        toast.dismiss({containerId: containerIds.editModal});
        innerRef.current?.close();
    };


    return (
        <dialog ref={innerRef} onClose={handleClose}>
            <form method="dialog" onSubmit={e => e.preventDefault()}>
                <section className='dialogX'>
                    <button onClick={handleClose}>
                        <img src="/assets/icons/cancel.svg" alt="Cancel icon"/>
                    </button>
                </section>
                <p className='dialogHeader'>Edit offer</p>
                <ModalHotelInput name={editedHotel?.name || ''}
                                 onNameChange={e => dispatch(updateEdited({type: 'name', value: e.target.value}))}
                                 description={editedHotel?.longDescription || ''}
                                 onDescriptionChange={e => dispatch(updateEdited({
                                     type: 'longDescription',
                                     value: e.target.value
                                 }))}
                                 location={editedHotel?.location || ''}
                                 onLocationChange={e => dispatch(updateEdited({
                                     type: 'location',
                                     value: e.target.value
                                 }))}
                                 price={editedHotel?.price.toString() || ''}
                                 onPriceChange={e => dispatch(updateEdited({
                                     type: 'price',
                                     value: e.target.value
                                 }))}
                                 localCategory={editedHotel?.localCategory.toString() || ''}
                                 onLocalCategoryChange={e => dispatch(updateEdited({
                                     type: 'localCategory',
                                     value: e.target.value
                                 }))}/>
                <section className='dialogButtonContainer'>
                    <button className='button secondary' onClick={handleClose}>
                        Cancel
                    </button>
                    <button className='button primary' onClick={handleSubmit}>
                        Edit
                    </button>
                </section>
            </form>
            <ToastContainer containerId={containerIds.editModal} position='bottom-right' />
        </dialog>
    );
});
