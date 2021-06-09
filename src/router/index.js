import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";
import NProgress from "nprogress";
import { routes } from "./routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: routes,
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    if (from.name) {
      localStorage.setItem('previousRoute', from.name);
    } else {
      localStorage.removeItem('previousRoute');
    }
    // Start the route progress bar.
    NProgress.start(800);
  } else {
    localStorage.removeItem('previousRoute');
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
