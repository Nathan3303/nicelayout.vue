import { createApp } from "vue";
import App from "./App.vue";
import niceLayout from "nice-layout";

const app = createApp(App);
app.use(niceLayout);
app.mount("#app");
