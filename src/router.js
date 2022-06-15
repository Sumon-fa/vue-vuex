import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UserAuth from './components/auth/UserAuth.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    //{ path: '/', redirect: '/teams' },
    { path: '/', component: UserAuth },
    {
      path: '/teams',
      component: TeamsList,

      children: [
        { path: '/teams/:teamId', component: TeamMembers, props: true },
      ],
    },
    { path: '/users', component: UsersList },

    { path: '/:notFound(.*)', component: TeamsList },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    return { left: 0, top: 0 };
  },
});
router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('Needs auth!');
    next();
  } else {
    next();
  }
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
  // next();
});
export default router;
