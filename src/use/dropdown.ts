import {ref} from "vue";
import type { Ref } from 'vue';

interface UseDropdownReturn {
    selectedItem: Ref<string>;
    isDropdownOpen: Ref<boolean>;
}

export default function useDropdown():UseDropdownReturn {

    const selectedItem = ref<string>('');
    const isDropdownOpen = ref<boolean>(false);

    return { selectedItem, isDropdownOpen }
}
