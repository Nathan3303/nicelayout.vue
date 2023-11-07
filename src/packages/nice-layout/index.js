const Components = await import("@nice-layout/components");

console.log(Components);

export default {
    install(vue) {
        Object.keys(Components).forEach((name) => {
            vue.component(name, Components[name]);
        });
    },
};
