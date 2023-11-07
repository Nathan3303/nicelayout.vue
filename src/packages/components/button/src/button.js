import { validateShape } from "@nice-layout/utils/validators";

/**
 * Define props
 */
export const buttonProps = {
    /**
     * @description Theme of button
     */
    theme: {
        type: [Array, String],
        default: "default",
    },
    /**
     * @description Shape of button
     */
    shape: {
        type: String,
        default: "square",
        validator: (v) => validateShape(v),
    },
    /**
     * @description Button icon (Only iconfont was supported so far)
     */
    icon: String,
    /**
     * @description Button disable state
     */
    disabled: Boolean,
    /**
     * @description Button loading state
     */
    loading: Boolean,
    /**
     * @description Button loading icon (Only iconfont so far)
     */
    loadingIcon: {
        type: String,
        default: "icon-loading",
    },
};
