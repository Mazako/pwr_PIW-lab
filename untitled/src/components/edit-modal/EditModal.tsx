import {forwardRef, useImperativeHandle, useRef} from "react";
import {ModalHotelInput} from "../modal-hotel-input/ModalHotelInput";
import {useDispatch, useSelector} from "react-redux";
import {editedHotelSelector, submitEdited, updateEdited} from "../../features/HotelsSlice";
import {AppDispatch} from "../../app/Store";

interface EditModalProps {
}

export const EditModal = forwardRef<HTMLDialogElement, EditModalProps>((props, ref) => {
    const editedHotel = useSelector(editedHotelSelector);
    const dispatch: AppDispatch = useDispatch()
    const innerRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const handleSubmit = () => {
        dispatch(submitEdited());
        innerRef.current?.close();
    }

    return (
        <dialog ref={innerRef} onSubmit={e => e.preventDefault()}>
            <form method="dialog">
                <section className='dialogX'>
                    <button onClick={() => innerRef.current?.close()}>
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
                                 price={editedHotel?.pricePerRoom.toString() || ''}
                                 onPriceChange={e => dispatch(updateEdited({
                                     type: 'pricePerRoom',
                                     value: e.target.value
                                 }))}
                                 localCategory={editedHotel?.localCategory.toString() || ''}
                                 onLocalCategoryChange={e => dispatch(updateEdited({
                                     type: 'localCategory',
                                     value: e.target.value
                                 }))}/>
                <section className='dialogButtonContainer'>
                    <button className='button secondary' onClick={() => innerRef.current?.close()}>
                        Cancel
                    </button>
                    <button className='button primary' onClick={handleSubmit}>
                        Edit
                    </button>
                </section>
            </form>
        </dialog>
    )
});
