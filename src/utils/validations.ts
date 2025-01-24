export const handleKeyDownLetter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (
        !/^[a-zA-Z\s]$/.test(key) &&
        key !== 'Backspace' &&
        key !== 'Delete' &&
        key !== 'Tab' &&
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight'
    ) {
        event.preventDefault();
    }
};

export const handleKeyDownLetterAndNumber = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (
        !/^[a-zA-Z0-9\s]$/.test(key) &&
        key !== 'Backspace' &&
        key !== 'Delete' &&
        key !== 'Tab' &&
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight'
    ) {
        event.preventDefault();
    }
};

export const handleKeyDownNumber = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;
    if (
        !/^[0-9.\s]$/.test(key) &&
        key !== 'Backspace' &&
        key !== 'Delete' &&
        key !== 'Tab' &&
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight'
    ) {
        event.preventDefault();
    }
};
