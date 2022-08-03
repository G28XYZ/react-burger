import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  </Provider>
);
