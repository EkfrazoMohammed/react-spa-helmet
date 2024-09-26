import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SinglePackages from './components/SinglePackages';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/single-package/:id" element={<SinglePackages />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
