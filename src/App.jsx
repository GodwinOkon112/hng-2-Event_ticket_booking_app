import './App.css';
import Navbar from './assets/Navbar';
import TicketSelection from './ticketSelection';
import Attendee from './Attendee';
import Ticket from './Ticket';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <div className='body '>
        <Routes>
          <Route path='/' element={<TicketSelection />} />
          <Route path='/attendee' element={<Attendee />} />
          <Route path='/ticket' element={<Ticket />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
