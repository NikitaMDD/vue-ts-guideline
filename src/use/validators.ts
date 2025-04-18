// Валидация имени
export const validateRequired = (value: string, isRequired: boolean) => {
    return !isRequired || value.length > 0;
};

// Валидация почты
export const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
    return emailPattern.test(value);
};

// Валидация номера телефона
export const validatePhone = (value: string) => {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phonePattern.test(value);
};

// Валидация номера банковской карты
export const validateCardNumber = (value: string) => {
    const cardPattern = /^\d{16}$/;
    return cardPattern.test(value);
};
