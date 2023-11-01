export const wordCounterProps = {
    /**
     * @description display mode of word counter
     */
    mode: {
        type: String,
        default: "word-limit",
        validator: (v) => ["word-limit", "word-left", "both"].includes(v),
    },
    /**
     * @description text length
     */
    length: Number,
    /**
     * @description max length
     */
    maxlength: [String, Number],
};
