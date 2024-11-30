import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes, //it's imported
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
