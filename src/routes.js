import {UsersPage} from 'views/Users.js';
import {CustomersPage} from 'views/Customers.js';
import {SuppliersPage} from 'views/Suppliers.js';
import {BrandsPage} from 'views/Brands.js';
import {LoginPage} from 'views/Login.js';
import Logs from 'views/Logs';
import {StockLogs} from 'views/Stocks';
import {PackagesPage} from 'views/Packages';
import {BoxedProductsPage} from 'views/Boxes';
import {MaterialsPage} from 'views/Materials';

const routes = [
  {
    collapse: true,
    name: 'Mevcut Stok',
    icon: 'tim-icons icon-chart-pie-36',
    state: 'pagesCollapse',
    views: [
      {
        path: '/boxed-products',
        name: 'Kutulu Ürün',
        mini: 'k.ü.',
        component: BoxedProductsPage,
        layout: '/admin',
      },
      {
        path: '/materials',
        name: 'Hammadde',
        mini: 'ham.',
        component: MaterialsPage,
        layout: '/admin',
      },
      {
        path: '/packages',
        name: 'Ambalaj',
        mini: 'a.',
        component: PackagesPage,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/brands',
    name: 'MARKALAR',
    icon: 'tim-icons icon-bag-16',
    component: BrandsPage,
    layout: '/admin',
  },
  {
    path: '/suppliers',
    name: 'TEDARİKÇİLER',
    icon: 'tim-icons icon-delivery-fast',
    component: SuppliersPage,
    layout: '/admin',
  },
  {
    path: '/customers',
    name: 'MÜŞTERİLER',
    icon: 'tim-icons icon-bus-front-12',
    component: CustomersPage,
    layout: '/admin',
  },
  {
    path: '/stockLogs',
    name: 'Stok GİRİŞ-ÇIKIŞ',
    icon: 'tim-icons icon-notes',
    component: StockLogs,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'KULLANICILAR',
    icon: 'tim-icons icon-book-bookmark',
    component: UsersPage,
    layout: '/admin',
  },
  {
    path: '/logs',
    name: 'Loglar',
    icon: 'tim-icons icon-paper',
    component: Logs,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Log Out',
    icon: 'fas fa-sign-out-alt',
    mini: 'LO',
    component: LoginPage,
    layout: '/auth',
  },
];

export default routes;
