import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
import Update from "@/views/Update.vue";
import updateemp from "@/views/UpdateEmp.vue";
import NotFound from "@/views/NotFoundPage.vue";
import CheckIn from "@/components/CheckIn.vue";

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Dashboard.vue")
      },
      {
        path: "/icons",
        name: "icons",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Icons.vue")
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
          )
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/GoogleMaps.vue")
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/RegularTables.vue")
      },

      {
        name: "ADD RESTAURANTS",
        path: "/Addrest",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/AddRest.vue")
      },
      {
        name: "ADD EMPLOYEE",
        path: "/add",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Add.vue")
      },
      {
        name: "RESTAURANTS",
        path: "/rest",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/RestList.vue")
      },
      {
        name: "EMPLOYEE",
        path: "/emp",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/EmpList.vue")
      },

      { name: "UPDATE RESTAURANTS", component: Update, path: "/update/:id" },
      { name: "UPDATE EMPLOYEE", component: updateemp, path: "/updateemp/:id" },
      { name: "checkin", component: CheckIn, path: "/checkin" }
    ]
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "demo" */ "../views/Pages/Register.vue")
      },

      { path: "*", component: NotFound }
    ]
  }
];

export default routes;
