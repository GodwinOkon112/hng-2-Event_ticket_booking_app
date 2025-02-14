import './App.css';
import Navbar from './assets/Navbar';
import TicketSelection from './ticketSelection';
import Attendee from './Attendee';
import Ticket from './Ticket';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [ticketData, setTicketData] = useState(null);

  return (
    <div>
      <Navbar />
      <div className='body '>
        <Routes>
          <Route path='/' element={<TicketSelection />} />
          <Route
            path='/attendee'
            element={<Attendee setTicketData={setTicketData} />}
          />
          <Route path='/attendees' element={<Attendee />} />
          <Route path='/ticket' element={<Ticket ticketData={ticketData} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
