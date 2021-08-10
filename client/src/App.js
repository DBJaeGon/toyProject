import { BrowserRouter as Router} from 'react-router-dom';
import { Layout } from 'antd';
import SiderNav from 'components/SiderNav';
import ContentRouter from 'components/ContentRouter';
import 'App.less';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <SiderNav />
          <ContentRouter />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
