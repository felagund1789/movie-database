import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

let darkMode = localStorage.getItem("darkMode");
if (!darkMode) {
  darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default new Vuetify({
  theme: {
    dark: darkMode,
    themes: {
      dark: {
        primary: "#f5c518",
        secondary: "#000000",
        accent: "#f5c518",
        strong: "#ffffff",
        background: colors.grey.darken4
      },
      light: {
        primary: "#f5c518",
        secondary: "#000000",
        accent: "#f5c518",
        strong: "#000000",
        background: colors.grey.lighten4
      }
    }
  }
});
