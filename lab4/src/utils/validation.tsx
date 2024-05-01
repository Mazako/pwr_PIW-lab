export interface ValidationResults {
    valid: boolean,
    messages: JSX.Element | null;
}

interface ValidatorEntry {
    property: string,
    canBeEmpty: false,
    messageIfEmpty?: string
    predicates?: {
        predicate: (str: string) => boolean,
        message: string
    }[]
}

const generalValidator = (entries: ValidatorEntry[]): ValidationResults => {
    const messages = entries
        .flatMap(entry => {
                if (!entry.canBeEmpty && NOT_EMPTY(entry.property || '')) {
                    return entry.messageIfEmpty || '';
                }
                return entry.predicates
                    ? entry.predicates
                        .filter(p => p.predicate(entry.property))
                        .map(p => p.message)
                    : [];
            }
        )
    const block = createValidationMessageBlock(messages);
    return {
        valid: block === null,
        messages: block,
    }

}

const NOT_EMPTY = (str: string) => str.trim() === '';

export const validateLogin = (email: string, password: string): ValidationResults => {
    return generalValidator([
        {property: email, canBeEmpty: false, messageIfEmpty: 'E-mail is empty'},
        {property: password, canBeEmpty: false, messageIfEmpty: 'Password is empty'},
    ])
}

export const validateRegistration = (firstName: string, lastName: string, email: string, password: string): ValidationResults => {
    return generalValidator([
        {property: firstName, canBeEmpty: false, messageIfEmpty: 'First name is empty'},
        {property: lastName, canBeEmpty: false, messageIfEmpty: 'Last name is empty'},
        {property: email, canBeEmpty: false, messageIfEmpty: 'Last name is empty'},
        {property: password, canBeEmpty: false, messageIfEmpty: 'Password is empty'},
    ])
}

export const validateAddEditData = (name: string,
                                    description: string,
                                    location: string,
                                    price: string,
                                    localCategory: string): ValidationResults => {
    return generalValidator([
        {property: name, canBeEmpty: false, messageIfEmpty: 'Name is empty'},
        {property: description, canBeEmpty: false, messageIfEmpty: 'Description is empty'},
        {property: location, canBeEmpty: false, messageIfEmpty: 'Location is empty'},
        {
            property: localCategory, canBeEmpty: false, messageIfEmpty: 'Local category is empty',
            predicates: [{predicate: str => Number(str) > 5 || Number(str) < 1, message: 'Invalid local category'}]
        },
        {
            property: price, canBeEmpty: false, messageIfEmpty: 'Price is empty',
            predicates: [{predicate: str => Number(str) <= 0, message: 'Price cannot be less or equal zero'}]
        }
    ]);
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
