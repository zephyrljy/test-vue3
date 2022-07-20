import { createApp } from "vue";
import App from "./App.vue";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

import "./style/index.scss";

createApp(App).use(VXETable).mount("#app");
