import { validateWidthAndHeight } from "@nice-layout/utils/validators";

export const divProps = {
    /**
     * @description Vertical state of the div
     */
    vertical: Boolean,
    /**
     * @description div flex attribute: align-items
     */
    alignItems: String,
    /**
     * @description div flex attribute: justify-content
     */
    justifyContent: String,
    /**
     * @description div flex attribute: flex
     */
    flex: String,
    /**
     * @description div flex attribute: flex-wrap
     */
    flexWrap: String,
    /**
     * @description div flex attribute: gap
     */
    gap: Number,
    /**
     * @description div width
     */
    width: {
        type: [String, Number],
        validator: (v) => validateWidthAndHeight(v),
    },
    /**
     * @description div height
     */
    height: {
        type: [String, Number],
        validator: (v) => validateWidthAndHeight(v),
    },
};
