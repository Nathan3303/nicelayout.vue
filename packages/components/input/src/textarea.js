export const textareaProps = {
    /**
     * @description Model-value of textarea (two-way value mapping)
     */
    modelValue: [String, Number],
    /**
     * @description Textarea id (Native attribute mapping)
     */
    textareaId: String,
    /**
     * @description input placeholder
     */
    placeholder: String,
    /**
     * @description Textarea rows (Native attribute mapping)
     */
    rows: {
        type: [String, Number],
        default: 1,
    },
    /**
     * @description Theme of textarea
     */
    theme: {
        type: [Array, String],
        default: "default",
    },
    /**
     * @description Shape of textarea
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => ["square", "no-border"].includes(v),
    },
    /**
     * @description Textarea diable state (Native attribute mapping)
     */
    disabled: Boolean,
    /**
     * @description Textarea readonly state (Native attribute mapping)
     */
    readonly: Boolean,
    /**
     * @description Textarea resize state
     */
    resize: Boolean,
    /**
     * @description Textarea autosize state
     */
    autosize: {
        type: [Boolean, Object],
        default: false,
    },
    /**
     * @description Max length of textarea value
     */
    maxlength: [String, Number],
    /**
     * @description Word counter controller (show word limit)
     */
    counter: {
        type: String,
        default: "off",
        validator: (v) => ["off", "word-limit", "word-left", "both"].includes(v),
    },
};

export const textareaEmits = [
    /**
     * @description Calling when textarea value is changed (Model-value)
     */
    "update:modelValue",
    /**
     * @description Calling when textarea was focused
     */
    "focused",
    /**
     * @description Calling when textarea was blured
     */
    "blured",
    /**
     * @description Calling when textarea value was inputed
     */
    "inputted",
    /**
     * @description Calling when textarea value was changed
     */
    "changed",
];
