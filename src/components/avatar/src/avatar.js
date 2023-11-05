import { validateSize, validateFit } from "@/utils/validators";

/**
 * Define props
 */
export const avatarProps = {
    /**
     * @description Image source address of avatar
     */
    src: String,
    /**
     * @description Avatar icon (Only iconfont)
     */
    icon: String,
    /**
     * @description Size of avatar
     */
    size: {
        type: [String, Number],
        default: "normal",
        validator: (v) => validateSize(v),
    },
    /**
     * @description Theme of avatar
     */
    theme: [String, Array],
    /**
     * @description Shape of avatar
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => ["square", "round"].includes(v),
    },
    /**
     * @description Border width of avatar
     */
    borderWidth: {
        type: Number,
        default: 0,
    },
    /**
     * @description Border color of avatar
     */
    borderColor: {
        type: String,
        default: "white",
    },
    /**
     * @description Alternating text of Avatar's image
     */
    alt: String,
    /**
     * @description Title of avata
     */
    title: {
        type: String,
        default: "nl-avatar",
    },
    /**
     * @description Fit mode of avatar (Effetivating when avatar is image type)
     */
    fit: {
        type: String,
        default: "cover",
        validator: (v) => validateFit(v),
    },
};

/**
 * Define emits
 */
export const avatarEmits = [
    /**
     * @description when image load failed
     */
    "error",
];
