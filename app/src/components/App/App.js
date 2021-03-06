import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Load } from '@/components/screens';
import Navigator from '@/navigators';
import { store, persistor } from '@/store';
import setup from '@/setup';

type State = {
  isLoaded: bool,
};

class App extends React.PureComponent<void, State> {
  state = {
    isLoaded: false
  };

  async componentDidMount() {
    await setup();
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Load />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={<Load />} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
