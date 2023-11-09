export const linkProps = {
    /**
     * @description Element tag of link
     */
    tag: {
        type: String,
        default: "a",
        validator: (v) => ["a", "router-link"].includes(v),
    },
    /**
     * @description Theme of the link
     */
    theme: {
        type: [String, Array],
        default: "default",
    },
    /**
     * @description Href attribute of the link (Native attribute mapping)
     */
    href: String,
    /**
     * @description Active state of the link
     */
    actived: Boolean,
    /**
     * @description Disable state of the link
     */
    disabled: Boolean,
    /**
     * @description Link icon (only iconfont)
     */
    icon: String,
};
