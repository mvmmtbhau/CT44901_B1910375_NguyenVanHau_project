import { createStore, createLogger } from "vuex";
import auth from "./modules/auth";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    auth,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : "" ,
});

// Nếu muốn xem cái gì thay đổi thì thêm createLogger() vào vào plugins