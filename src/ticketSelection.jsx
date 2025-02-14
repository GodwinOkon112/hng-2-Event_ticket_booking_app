import { useNavigate } from 'react-router-dom';
import Parent from './parent';
import { Container1 } from './parent';

const TicketSelection = () => {
 const navigate = useNavigate()

  return (
    <Parent>
      <div className='ticket-head'>
        <h1>Ticket Selection</h1>
        <p>Step 1/3</p>
      </div>
      <div className='progressContainer'>
        <div className='progressBar'></div>
      </div>

      <div className='ticket-body'>
        <div className='ticket-inner'>
          <h1>Techember Fest ”25</h1>
          <p>
            Join us for an unforgettable experience at <br />
            [Event Name]! Secure your spot now.
          </p>
          <div className='location'>
            <p>📍 [Event Location]</p>
            <p className='line'></p>
            <p>March 15, 2025 | 7:00 PM</p>
          </div>
        </div>

        <hr />
        <div className='ticket-type'>
          <p>Select Ticket Type:</p>
          <Container1>
            <div className='first type'>
              <div>
                <h5>Regular Access</h5>
                <h6>20 left!</h6>
              </div>
              <div>
                <img src='/src/assets/free.svg' alt='' />
              </div>
            </div>
            <div className='second type'>
              <div>
                <h5>VIP Access</h5>
                <h6>20 left!</h6>
              </div>
              <div>
                <img src='/src/assets/50.svg' alt='' />
              </div>
            </div>
            <div className='third type'>
              <div>
                <h5>VVIP Access</h5>
                <h6>20 left!</h6>
              </div>
              <div>
                <img src='/src/assets/150.svg' alt='' />
              </div>
            </div>
          </Container1>
        </div>

        {/* number of ticket */}
        <div className='ticket-number'>
          <p> Number of Tickets:</p>
          <select name='1' id='one'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
        </div>

        <div className='btn'>
          <button onClick={() => navigate('/')}>Cancel</button>
          <button onClick={() => navigate('/attendee')}>Next</button>
        </div>
      </div>
    </Parent>
  );
};

export default TicketSelection;
