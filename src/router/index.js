import { createRouter, createWebHistory } from 'vue-router';

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ListRoomView from "@/views/ListRoomView.vue";
import RoomAddView from "@/views/RoomAddView.vue";
import RoomEditView from "@/views/RoomEditView.vue";
import ListStaffView from "@/views/ListStaffView.vue";
import ListPositionView from "@/views/ListPositionView.vue";
import StaffAddView from "@/views/StaffAddView.vue";
import StaffEditView from "@/views/StaffEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => HomeView,
      children: [
        {
          path: '/rooms',
          name: 'ListRoom',
          component: () => ListRoomView,
          children: [
            {
              path: 'add',
              name: 'AddRoom',
              component: () => RoomAddView,
            },
            {
              path: 'edit/:id',
              name: 'EditRoom',
              component: () => RoomEditView,
            },
          ]
        },
        {
          path: '/staffs',
          name: 'ListStaff',
          component: () => ListStaffView,
          children: [
            {
              path: 'add',
              name: 'AddStaff',
              component: () => StaffAddView,
            },
            {
              path: 'edit/:id',
              name: 'EditStaff',
              component: () => StaffEditView,
            },
          ]
        },
        {
          path: '/positions',
          name: 'ListPosition',
          component: () => ListPositionView,
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => LoginView,
    }
  ]
})

export default router;
