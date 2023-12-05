import { ref, nextTick } from "vue";

const isFunction = (fn) => typeof fn === "function";

/**
 * Use edit controller
 * @param {any} initialValue Initial value of control state
 * @param {{
 *   vmInitialValue: any,
 *   vmHandler: Function,
 *   vmValidator: Function,
 *   editorElementId: string,
 *   editorRef: ref,
 * }} options control options
 * @return {
 *   isEditing: boolean,
 *   vModel: ref,
 *   goEdit: Function,
 *   onEditorBlur: Function
 * }
 */
export default function useEditController(
    initialValue,
    { vmInitialValue, vmHandler, vmValidator, editorElementId, editorRef } = options
) {
    const isEditing = ref(initialValue);
    const vModel = ref(vmInitialValue || "");

    /**
     * Go edit
     * @brief Make value of the control state become true, and editor on focus.
     */
    function goEdit() {
        isEditing.value = !isEditing.value;
        if (isEditing.value) {
            nextTick(() => {
                if (editorRef) {
                    editorRef.value?.focus();
                } else if (editorElementId) {
                    document.getElementById(editorElementId).focus();
                }
            });
        }
    }

    /**
     * Callback function for editor was blured
     * @param {boolean} isContinueEdit
     * @param {boolean} isClearVModel
     */
    function onEditorBlur(isContinueEdit = false, isClearVModel = true) {
        let validateResult = true;
        if (isFunction(vmValidator)) validateResult = vmValidator(vModel.value);
        if (isFunction(vmHandler) && validateResult) vmHandler(vModel.value);
        isEditing.value = isContinueEdit;
        if (isClearVModel) vModel.value = "";
    }

    return { isEditing, vModel, goEdit, onEditorBlur };
}

export { useEditController };
