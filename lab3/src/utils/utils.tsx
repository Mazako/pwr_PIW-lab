import {isBooleanObject} from "node:util/types";

export const createRateStr = (rate: number): string => {
    let result = '';
    for (let i = 1; i <= 5; i++) {
        result += i <= rate ? '★' : '☆';
    }
    return result;
};

export interface ValidateAddEditDataResults {
    valid: boolean,
    messages: JSX.Element[]
}

export const validateAddEditData = (name: string,
                                    description: string,
                                    location: string,
                                    price: string,
                                    localCategory: string) : ValidateAddEditDataResults => {
    let messages: JSX.Element[] = [<p style={{fontWeight: "bold"}}>Validation errors:</p>];
    let valid = true;
    if (name === '') {
        messages.push(<p>Hotel name is empty</p>);
        valid = false;
    }

    if (description === '') {
        messages.push(<p>Hotel description is empty</p>);
        valid = false;
    }

    if (location === '') {
        messages.push(<p>Hotel location is empty</p>);
        valid = false;
    }

    if (price === '') {
        messages.push(<p>Hotel price is empty</p>);
        valid = false;
    } else if (Number(price) <= 0){
        messages.push(<p>Price cannot be less or equal zero</p>);
    }

    if (localCategory === '') {
        messages.push(<p>Hotel local category is empty</p>);
        valid = false;
    } else if (Number(localCategory) > 5 || Number(localCategory) < 1) {
        messages.push(<p>Invalid local category</p>);
        valid = false;
    }

    return {
        valid,
        messages
    };
};
