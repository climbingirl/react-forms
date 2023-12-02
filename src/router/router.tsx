import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ROUTES } from './routes';
import App from '../components/App/App';
import Unontrolled from '../Pages/Uncontrolled/Uncontrolled';
import Controlled from '../Pages/Controlled/Controlled';
import Home from '../Pages/Home/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.ROOT} element={<App />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.UNCONTROLLED} element={<Unontrolled />} />
      <Route path={ROUTES.CONTROLLED} element={<Controlled />} />
    </Route>
  )
);
