import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const AddEmployeePage = lazy(() => import('src/pages/addemployee'));
export const EditEmployeePage = lazy(()=>import('src/pages/editemployee') );
export const PayrollPage = lazy(()=> import('src/pages/payroll'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addemployees', element: <AddEmployeePage/>},
        { path: 'edit-employee/:employeeId', element: <EditEmployeePage/>},
        { path: 'payroll', element: <PayrollPage/>},

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage/>
    },
    {
      path: 'addemployees',
      element:<AddEmployeePage/>
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'edit-employee/:employeeId',
      element:<EditEmployeePage/>,
    },
    {
      path: 'payroll',
      element:<PayrollPage/>,
    },
  ]);

  return routes;
}
