import {ref} from "vue";
import type {Ref} from "vue";
import type {FileObject} from '../types/FileObject.ts';

interface UseInputReturn {
    arrayOfFiles: Ref<FileObject[]>;
}

export default function useFiles():UseInputReturn {
    const arrayOfFiles = ref<FileObject[]>([]);

    return {arrayOfFiles};
}
