import { Provider } from 'react-redux';
import store from './store/store';
import ReactFlowContext from './context/ReactFlowContext';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
    return (
        <Provider store={store}>
            <div className="flex">
                <UserList />
                <ReactFlowContext />
                <UserForm />
            </div>
        </Provider>
    );
};

export default App;
