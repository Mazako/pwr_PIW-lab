import {ChangeEvent, FC} from "react";

import styles from "./ModalHotelInput.module.css";

interface HotelModalInputProps {
    name: string,
    onNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    description: string,
    onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    location: string,
    onLocationChange: (e: ChangeEvent<HTMLInputElement>) => void,
    price: string,
    onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void,
    localCategory: string,
    onLocalCategoryChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const ModalHotelInput: FC<HotelModalInputProps> = (props) => {
    return (
        <section className={styles.dialogContainer}>
            <label htmlFor={styles['name']} id={styles['nameL']}>Hotel name</label>
            <input type='text'
                   id={styles['name']}
                   className={styles.dialogInput}
                   placeholder='Provide the hotel name'
                   value={props.name}
                   onChange={props.onNameChange}/>

            <label htmlFor={styles['description']} id={styles['descriptionL']}>Description</label>
            <textarea id={styles['description']}
                      className={styles.dialogInput}
                      placeholder='Add a description of your hotel'
                      value={props.description}
                      onChange={props.onDescriptionChange}/>

            <label htmlFor={styles['location']} id={styles['locationL']}>Location</label>
            <input type='text'
                   id={styles['location']}
                   className={styles.dialogInput}
                   placeholder='City'
                   value={props.location}
                   onChange={props.onLocationChange}/>

            <label htmlFor={styles['price']} id={styles['priceL']}>Price</label>
            <input type='number'
                   id={styles['price']}
                   className={styles.dialogInput}
                   placeholder='Cost per room per night'
                   value={props.price}
                   onChange={props.onPriceChange}/>

            <label htmlFor={styles['local']} id={styles['localL']}>Local category</label>
            <input type='number'
                   min='1'
                   max='5'
                   id={styles['local']}
                   className={styles.dialogInput}
                   placeholder='Max 5 stars, min 1 star'
                   value={props.localCategory}
                   onChange={props.onLocalCategoryChange}/>
        </section>
    );
};
