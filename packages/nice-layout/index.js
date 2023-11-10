import Components from "./components";
import "@nice-layout/assets/iconfont/iconfont.css";
// import "@nice-layout/assets/iconfont/iconfont.ttf";

// export * from "@nice-layout/components";
// export * from "@nice-layout/utils";
// export * from "@nice-layout/hooks";

/**
 * Install components globally
 */
export default {
    install(vue) {
        // console.log("Install global components", Components);
        Components.forEach((component) => {
            vue.component(component.name, component);
        });
    },
};
