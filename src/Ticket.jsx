import { useRef } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import Parent from './parent';
import { useLocation } from 'react-router-dom';

const Ticket = ({ fullName, email, avatar }) => {
  const ticketRef = useRef(null);
  const location = useLocation();  // Added to retrieve state data
const formData = location.state || { fullName: "", email: "", avatar: "" };  // Added: Default empty data if none passed

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
              <img
                src={formData.avatar}
                alt='user avatar'
                className='ticket-avatar'
              />
            </div>
            <div className='descriptions'>
              <h1>
                Techember <br /> Fest ”25
              </h1>
              <div className='small-desc'>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className='small'>
                <h3>{formData.fullName}</h3>
                <p>{formData.email}</p>
              </div>
            </div>
            <div className='imgup'>
              <img src='src/assets/QRcode.svg' alt='' />
            </div>
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
