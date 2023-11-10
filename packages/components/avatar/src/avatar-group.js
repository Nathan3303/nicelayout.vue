import { validateSize, validateShape } from "@nice-layout/utils/validators";

export const avatarGroupProps = {
    /**
     * @description avatar group data
     */
    data: Array,
    /**
     * @description avatar size
     */
    size: {
        type: [String, Number],
        default: "normal",
        validator: (v) => validateSize(v),
    },
    /**
     * @description avatar shape
     */
    shape: {
        type: String,
        default: "round",
        validator: (v) => validateShape(v),
    },
    /**
     * @description Border width of avatar (Avatar prop mapping)
     */
    borderWidth: {
        type: Number,
        default: 3,
    },
    /**
     * @description Border color of avatar (Avatar prop mapping)
     */
    borderColor: {
        type: String,
        default: "white",
    },
    /**
     * @description avatar group is addable or not
     */
    addable: Boolean,
};

export const avatarGroupEmits = [
    /**
     * @description when add button clicked
     */
    "add",
];
