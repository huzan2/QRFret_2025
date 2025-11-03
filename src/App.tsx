import Routers from './Routers';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './styles/Layout';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>{<Routers />}</Layout>
    </>
  );
}

export default App;
