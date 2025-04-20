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

// Валидация даты
export const validateDate = (value: string) => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

    if (!datePattern.test(value)) {
        return false;
    }

    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return false;
    }

    const today = new Date();

    if (date > today) {
        return false;
    }

    return true;
}
