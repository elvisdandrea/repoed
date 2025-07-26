import { Route, Routes } from 'react-router-dom';
import { SideNavView } from './components/home/sideNav';
import { EditFile } from './components/file-manager/edit-file';
import { NewFile } from './components/file-manager/new-file';

function App() {

  return (
      <div id="wrapper">
          <SideNavView />
          <div id="content-wrapper" className='d-flex flex-column'>
            <div id="content">
              <Routes>
                <Route path="/" element={<EditFile />} />
                <Route path="/edit" element={<EditFile />} />
                <Route path="/new" element={<NewFile />} />
              </Routes>
            </div>
          </div>
      </div>
  )
}

export default App
