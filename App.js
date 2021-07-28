import * as React from 'react';
import Navigation from './src/navigation';
import redux from './src/store/store'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Provider } from 'react-redux'


export default function App() {
  React.useEffect(() => {
    lockOrientation()
  }, [])
  const lockOrientation = async () => {
   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  }
  return (
    <Provider store={redux.store}>
        <Navigation />
    </Provider>
  );
}


