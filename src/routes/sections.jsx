// section.jsx
import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// const IndexPage = lazy(() => import('src/pages/app'));
const BlogPage = lazy(() => import('src/pages/blog'));
const UserPage = lazy(() => import('src/pages/user'));
const LoginPage = lazy(() => import('src/pages/login'));
const ProductsPage = lazy(() => import('src/pages/products'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
const RegisterPage = lazy(() => import('src/pages/register'));
const AddEmployeePage = lazy(() => import('src/pages/addemployee'));
const EditEmployeePage = lazy(() => import('src/pages/editemployee'));
const PayrollPage = lazy(() => import('src/pages/payroll'));
const MoreInfo = lazy(() => import('src/pages/info'));
const SalaryHistory = lazy(() => import('src/pages/saralyhistory'));
const SalarySlip = lazy(() => import('src/pages/salaryslip'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PayrollPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addemployees', element: <AddEmployeePage /> },
        { path: 'edit-employee/:employeeId', element: <EditEmployeePage /> },
        { path: 'payroll', element: <PayrollPage /> },
        { path: 'info/:employeeId', element: <MoreInfo />},
        { path: 'info/SalaryHistory/:employeeId', element: <SalaryHistory />},
        { path: 'info/SalaryHistory/:employeeId', element: <SalaryHistory />},
        { path: 'info/SalarySlip/:employeeId/:selectedDate', element: <SalarySlip />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
