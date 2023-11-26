import { validateShape, validateWidthAndHeight } from "@nice-layout/utils/validators";

export const inputProps = {
    /**
     * @description Type of input (Native attribute mapping)
     */
    type: {
        type: String,
        default: "text",
        validator: (v) => ["text", "password", "number"].includes(v),
    },
    /**
     * @description Model-value of input (two-way value mapping)
     */
    modelValue: [String, Number],
    /**
     * @description input id (Native attribute mapping)
     */
    inputId: String,
    /**
     * @description Input value formatter (Format value when updated)
     */
    formatter: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Input value parser (Parse value when updated)
     */
    parser: {
        type: Function,
        default: (value) => value,
    },
    /**
     * @description Theme(s) of input (Allow custom style)
     */
    theme: {
        type: [Array, String],
        default: "default",
    },
    /**
     * @description Border shape of input (circle, square or no-border)
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description Prefix icon of input (Only iconfont so far)
     */
    icon: String,
    /**
     * @description Prefix text of input
     */
    prefix: String,
    /**
     * @description Suffix text of input
     */
    suffix: String,
    /**
     * @description Input placeholder
     */
    placeholder: String,
    /**
     * @description Max length of input value (Native attribute mapping)
     */
    maxlength: {
        type: [String, Number],
        default: -1,
    },
    /**
     * @description Autocomplete state (Native attribute mapping)
     */
    autocomplete: {
        type: String,
        default: "off",
    },
    /**
     * @description Disabled state (Native attribute mapping)
     */
    disabled: Boolean,
    /**
     * @description Readonly state (Native attribute mapping)
     */
    readonly: Boolean,
    /**
     * @description Clearable state (Control delete button)
     */
    clearable: Boolean,
    /**
     * @description Allow show password state (Effective when input type is password)
     */
    allowShowPassword: Boolean,
    /**
     * @description Word counter controller (show word limit)
     */
    counter: {
        type: String,
        default: "off",
        validator: (v) => ["off", "word-limit", "word-left", "both"].includes(v),
    },
    /**
     * @description Input width (Quick set)
     */
    width: {
        type: String,
        default: "auto",
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description Input height (Quick set)
     */
    height: {
        type: String,
        default: "36px",
        validator: (v) => validateWidthAndHeight(v),
    },
};

export const inputEmits = [
    /**
     * @description Calling when input value is changed (Model-value)
     */
    "update:modelValue",
    /**
     * @description Calling when input was focused
     */
    "focused",
    /**
     * @description Calling when input was blured
     */
    "blured",
    /**
     * @description Calling when input value was inputed
     */
    "inputted",
    /**
     * @description Calling when input value was changed
     */
    "changed",
    /**
     * @description Calling when input was cleared
     */
    "cleared",
];
