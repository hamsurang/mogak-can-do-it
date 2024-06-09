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
        {/* <img src="/path/to/image2.png" alt="Image 2" className={imageStyle} /> */}
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
  width: '100%',
  backgroundColor: 'white',
});

const mainStyle = css({
  width: '100%',
  maxWidth: '500px',
  height: 'fit-content',
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
