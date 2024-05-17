/**
  * imports the following the components from the './src/components/index.ts' file
 */
import { Main } from './components';


/**
 * a component named 'App'
 * @description the main component for displaying the components in the DOM
 * it returns first the Navbar component, then the Shop component
 */
function App() {
  return (
    <>
      <Main />
    </>
  )
}

export default App
