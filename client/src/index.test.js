import ReactDOM from 'react-dom';
import App from './App';

// Mocking the module to spy on the render function
jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.js', () => {
  it('calls ReactDOM.render with <App />', () => {
    // Import index.js to run it
    require('./index');

    // Assert that ReactDOM.render was called with <App />
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
});
