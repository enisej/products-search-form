import { createApp } from "vue";
import "./style.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiSearch } from "oh-vue-icons/icons";
import App from "./App.vue";

addIcons(BiSearch);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.mount("#app");
