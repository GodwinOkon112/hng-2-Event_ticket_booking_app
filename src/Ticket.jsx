import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Parent from './parent';
import { useLocation, useNavigate } from 'react-router-dom';
import star1 from './assets/regup.svg';
import star2 from './assets/rgdown.svg';

const Ticket = () => {
  const ticketRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || { fullName: '', email: '', avatar: '' };

  const handleDownload = () => {
    const ticketElem = ticketRef.current;

    html2canvas(ticketElem, {
      scale: 2,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('ticket.pdf');
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
        {/* <div className='large'>
          <div className='flex-large'>
            <div className='userImage'>
              <img
                src={formData.avatar}
                alt='user avatar'
                className='ticket-avatar'
                crossOrigin='anonymous'
              />
            </div>
            <div className='descriptions'>
              <h1>Techember Fest ”25</h1>
              <div className='small-desc'>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className='small'>
                <h3>Name: {formData.fullName}</h3>
                <p>Email: {formData.email}</p>
              </div>
            </div>
            <div className='imgup'>
              <img src='src/QRcode.svg' alt='' />
            </div>
          </div>
        </div> */}
        <div className='ticket'>
          <div className='userimage'>
            <img
              src={formData.avatar}
              alt='user avatar'
              className='ticket-avatar'
              crossOrigin='anonymous'
            />
          </div>
          <div className='textboxuser'>
            <h1>Name: {formData.fullName}</h1>
            <h1>Email: {formData.email}</h1>

            <div className='details'>
              <h1>Techember Fest ”25</h1>
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p>📅 March 15, 2025 | 7:00 PM</p>
            </div>

            <div className='starimage'>
              <img src={star1} alt='' />
              <img src={star2} alt='' />
            </div>
          </div>
        </div>
      </div>

      <div className='btnNew'>
        <button onClick={() => navigate('/')}>Book Another Ticket</button>
        <button onClick={handleDownload}>Download Ticket</button>
      </div>
    </Parent>
  );
};

export default Ticket;
