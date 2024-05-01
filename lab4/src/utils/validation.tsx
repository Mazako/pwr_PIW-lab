export interface ValidationResults {
    valid: boolean,
    messages: JSX.Element | null;
}

export interface ValidatorEntry {
    property: string,
    predicates: {
        predicate: (str: string) => boolean,
        message: string
    }[]
}

const generalValidator = (entries: ValidatorEntry[]): ValidationResults => {
    const messages = entries
        .flatMap(entry => entry.predicates.filter(p => p.predicate(entry.property)))
        .map(p => p.message);

    const block = createValidationMessageBlock(messages);
    return {
        valid: block === null,
        messages: block,
    }

}

const NOT_EMPTY = (str: string) => str.trim() === '';

export const validateLogin = (email: string, password: string): ValidationResults => {
    let messages: string[] = [];
    let valid = true;
    if (email === '') {
        messages.push('E-mail is empty');
        valid = false;
    }

    if (password === '') {
        messages.push('Password is empty');
        valid = false;
    }


    return {
        valid,
        messages: createValidationMessageBlock(messages)
    };
}

export const validateRegistration = (firstName: string, lastName: string, email: string, password: string): ValidationResults => {
    const messages: string[] = []
    let valid = true;
    if (email === '') {
        messages.push('E-mail is empty');
        valid = false;
    }

    if (password === '') {
        messages.push('Password is empty');
        valid = false;
    }

    return {
        valid,
        messages: createValidationMessageBlock(messages)
    };
}

export const validateAddEditData = (name: string,
                                    description: string,
                                    location: string,
                                    price: string,
                                    localCategory: string): ValidationResults => {
    return generalValidator([
        {
            property: name,
            predicates: [{predicate: NOT_EMPTY, message: 'Name is empty'}],
        }
    ])
}


const createValidationMessageBlock = (messages: string[]) => {
    if (messages.length === 0) {
        return null;
    }
    return (
        <section>
            <p style={{fontWeight: "bold"}}>Validation errors: </p>
            {
                messages.map(m => <p>{m}</p>)
            }
        </section>
    )
}
