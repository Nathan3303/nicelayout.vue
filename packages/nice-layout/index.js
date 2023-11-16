import Components from "./components";
import "@nice-layout/assets/iconfont/iconfont.css";

export default {
    install(vue) {
        Components.forEach((component) => {
            vue.component(component.name, component);
        });
    },
};
