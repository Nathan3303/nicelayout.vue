import { isArray } from "./utils/utils";

export default function installGloableComps(app) {
    const components = import.meta.glob("./components/**/index.js", { eager: true });
    for (let [key, value] of Object.entries(components)) {
        // console.log(value);
        if (value.default) {
            if (isArray(value.default)) {
                value.default.map((comp) => comp.install(app));
            } else {
                value.default.install(app);
            }
        } else {
            for (const comp of Object.entries(value)) comp[1].install(app);
        }
    }
}
