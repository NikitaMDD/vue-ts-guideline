import { ref } from 'vue';
import type { Ref } from 'vue';

interface UseInputReturn {
    modelInput: Ref<string>,
    isError: Ref<boolean>,
    validate: (value: string) => boolean,
}

export default function useInput(validateFn: (value: string, isRequired: boolean) => boolean, isRequired: boolean = true): UseInputReturn {
    const modelInput = ref<string>('');
    const isError = ref<boolean>(false);

    const validate = (value: string) => {
        isError.value = !validateFn(value, isRequired);
        return !isError.value;
    };

    return { modelInput, isError, validate };
}
