import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UserAuth from './components/auth/UserAuth.vue';
import store from './store/index';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    //{ path: '/', redirect: '/teams' },
    { path: '/', component: UserAuth, meta: { requiresUnauth: true } },
    {
      path: '/teams',
      component: TeamsList,

      children: [
        { path: '/teams/:teamId', component: TeamMembers, props: true },
      ],
      meta: { requiresAuth: true },
    },
    { path: '/users', component: UsersList, meta: { requiresAuth: true } },

    { path: '/:notFound(.*)', component: TeamsList },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    return { left: 0, top: 0 };
  },
});
router.beforeEach(function (to, _, next) {
  console.log(store.getters['auth/isAuthenticated']);
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    console.log(store.getters['auth/isAuthenticated']);
    next('/');
  }
  if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    console.log(store.getters['auth/isAuthenticated']);
    next('/users');
  } else {
    console.log(store.getters['auth/isAuthenticated']);
    next();
  }
});

export default router;
