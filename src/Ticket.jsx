import { useEffect, useState, useRef } from 'react';
import domtoimage from 'dom-to-image';
import Parent from './parent';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Ticket = ({ ticketData }) => {
   const [storedData, setStoredData] = useState(ticketData);
   const ticketRef = useRef(null);
   const navigate = useNavigate()

   useEffect(() => {
     if (!ticketData) {
       const savedData = localStorage.getItem('ticketData');
       if (savedData) {
         setStoredData(JSON.parse(savedData));
       }
     }
   }, [ticketData]);

   if (!storedData) {
     return <h2>No Ticket Found</h2>;
   }

   const downloadTicket = () => {
     domtoimage
       .toPng(ticketRef.current)
       .then((dataUrl) => {
         const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
         const imgWidth = 190; // Adjust width for A4
         const imgHeight =
           (pdf.internal.pageSize.getWidth() / ticketRef.current.clientWidth) *
           ticketRef.current.clientHeight;

         pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth, imgHeight);
         pdf.save('event-ticket.pdf'); // ✅ Saves as PDF
       })
       .catch((error) => {
         console.error('Failed to generate PDF', error);
       });
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
              <img
                src={storedData.avatarUrl}
                alt='user avatar'
                className='ticket-avatar'
              />
            </div>
            <div className='descriptions'>
              <h1>Techember Fest ”25</h1>
              <div className='small-desc'>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className='email'>
                <h3>Full-name: {storedData.fullName}</h3>
                <h3>Email:{storedData.email}</h3>
              </div>
            </div>
            <div className='QR'>
              <img src='src/assets/QRcode.svg' alt='' />
            </div>
          </div>
        </div>
      </div>

      <div className='btnNew'>
        <button onClick={() => navigate('/')}>Cancel</button>
        <button onClick={downloadTicket}>Download Ticket</button>
      </div>
    </Parent>
  );
};

export default Ticket;
