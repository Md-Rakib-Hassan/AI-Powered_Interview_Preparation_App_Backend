import { Router } from "express";
import { AuthRoutes } from "./authRoutes";
import { AiRoutes } from "./aiRoutes";
import sessionRoutes from "./sessionRoutes";
import questionRoutes from "./questionRoutes";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route:AuthRoutes,
    },
    
    {
        path: '/sessions',
        route:sessionRoutes,
    },
    {
        path: '/questions',
        route:questionRoutes,
    },
    {
        path: '/ai',
        route:AiRoutes,
    }
    
    
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;