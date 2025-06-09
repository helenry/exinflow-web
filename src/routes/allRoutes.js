// routes/allRoutes.js
import { lazy } from "react";

const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Budgets = lazy(() => import("../pages/Budgets"));
const Credits = lazy(() => import("../pages/Credits"));
const Savings = lazy(() => import("../pages/Savings"));
const Investments = lazy(() => import("../pages/Investments"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Wallets = lazy(() => import("../pages/Wallets"));
const Categories = lazy(() => import("../pages/Categories"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Layout = lazy(() => import("../components/layouts/Layout"));

export const paths = {
  sign_in: "/sign-in",
  dashboard: "/dashboard",
  transactions: "/transactions",
  budgets: "/budgets",
  credits: "/credits",
  savings: "/savings",
  investments: "/investments",
  analytics: "/analytics",
  wallets: "/wallets",
  categories: "/categories",
  settings: "/settings",
};

export const routes = [
  {
    path: paths.sign_in,
    component: SignIn,
    isProtected: false,
    isRestricted: true,
    layout: null,
    title: "Sign In",
  },
  {
    path: paths.dashboard,
    component: Dashboard,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Dashboard",
  },
  {
    path: paths.transactions,
    component: Transactions,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Transactions",
  },
  {
    path: paths.budgets,
    component: Budgets,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Budgets",
  },
  {
    path: paths.credits,
    component: Credits,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Credits",
  },
  {
    path: paths.savings,
    component: Savings,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Savings",
  },
  {
    path: paths.investments,
    component: Investments,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Investments",
  },
  {
    path: paths.analytics,
    component: Analytics,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Analytics",
  },
  {
    path: paths.wallets,
    component: Wallets,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Wallets",
  },
  {
    path: paths.categories,
    component: Categories,
    isProtected: true,
    isInSidebar: true,
    layout: Layout,
    title: "Categories",
  },
  {
    path: "*",
    component: NotFound,
    isProtected: false,
    layout: null,
    title: "Page Not Found",
  },
];
