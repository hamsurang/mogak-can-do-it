import { Theme } from '@radix-ui/themes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { css } from '../../styled-system/css';
import App from '../App';
import ErrorPage from '../pages/Error';
import MogakPage from '../pages/Mogak';
import HomePage from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/mogak',
    element: <MogakPage />,
    errorElement: <ErrorPage />,
  },
]);

const GlobalLayout = () => (
  <section className={outerSectionStyle}>
    <Theme className={sectionStyle}>
      <aside className={asideStyle}>
        <img src="/surang.png" alt="Image 1" className={imageStyle} />
        <img src="/title.png" alt="Image 2" className={titleStyle} />
      </aside>
      <main className={mainStyle}>
        <RouterProvider router={router} />
      </main>
    </Theme>
  </section>
);

export default GlobalLayout;

const outerSectionStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

const sectionStyle = css({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  width: '100%',
});

const mainStyle = css({
  width: '100%',
  maxWidth: '500px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const asideStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px',
});

const imageStyle = css({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
});

const titleStyle = css({
  width: '100%',
  maxWidth: '100px',
  height: 'auto',
});
