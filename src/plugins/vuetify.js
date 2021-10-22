import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#f5c518",
        secondary: "#000000",
        accent: "#f5c518",
        background: colors.grey.darken4
      },
      light: {
        primary: "#000000",
        secondary: "#f5c518",
        accent: "#f5c518",
        background: colors.grey.lighten4
      }
    }
  }
});
