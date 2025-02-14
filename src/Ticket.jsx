import { useRef } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import Parent from './parent';

const Ticket = ({ fullName, email, avatar }) => {
  const ticketRef = useRef(null);

  const handleDownload = async () => {
    if (ticketRef.current) {
      domtoimage.toPng(ticketRef.current).then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${fullName}_ticket.png`;
        link.click();
      });
    }
  };

  return (
    <Parent>
      <div className='ticket-head'>
        <h1>Ready</h1>
        <p>Step 3/3</p>
      </div>
      <div className='progressContainer'>
        <div className='progressBar'></div>
      </div>
      <div className='ticket-ready'>
        <h1>Your Ticket is Booked!</h1>
        <p>
          You can download and <br /> save for later
        </p>
      </div>

      <div className='ticket-container' ref={ticketRef}>
        <div className='large'>
          <div className='flex-large'>
            <div className='userImage'>
              <img src={avatar} alt='user avatar' className='ticket-avatar' />
            </div>
            <div className='descriptions'>
              <h1>Techember Fest ”25</h1>
              <div className='small-desc'>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className='email'>
                <h3>Full-name: godwin</h3>
                <h3>Email: godwinokon112@gmail.com</h3>
              </div>
            </div>
            <div className='imgup'>
              <img src='src/assets/regup.svg' alt='' />
            </div>
          </div>

          <div className='bottomdesign'>
            <p>Ticket for 1 entry only</p>
          </div>
        </div>
      
      </div>

      <div className='btnNew'>
        <button>Cancel</button>
        <button onClick={handleDownload}>Download Ticket</button>
      </div>
    </Parent>
  );
};

export default Ticket;
