/**
 * Define props
 */
export const badgeProps = {
    /**
     * @description badge theme
     */
    theme: {
        type: [String, Array],
        default: "default",
    },
    /**
     * @description badge value
     */
    value: {
        type: [String, Number],
        default: "",
    },
    /**
     * @description badge max value (Only effective when value is type of number)
     */
    max: {
        type: Number,
        default: 99,
    },
    /**
     * @description if is hide badge
     */
    hidden: Boolean,
    /**
     * @description display dot instead value
     */
    dot: Boolean,
};
