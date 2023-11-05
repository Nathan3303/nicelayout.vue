import { createApp } from "vue";
import App from "./App.vue";
import installGloableComps from "./install";

const app = createApp(App);
installGloableComps(app);
app.mount("#app");
