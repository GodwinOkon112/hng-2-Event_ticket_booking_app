import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Parent from './parent';
import { useLocation, useNavigate } from 'react-router-dom';
import bar from './assets/barcode.svg';
import star2 from './assets/rgdown.svg';

const Ticket = () => {
  const ticketRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {
    fullName: '',
    email: '',
    avatar: '',
    request: '',
  };

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
        <p>Check your email for a copy or you can download</p>
      </div>

      <div className='ticket-con' ref={ticketRef}>
        {/* <div className='ticket'>
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
        </div> */}
        <div className='bg-container'>
          <div className='bg-inner-container'>
            <div className='textbox'>
              <div className='detail'>
                <h1>Techember Fest ”25</h1>
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className='image-con'>
                <img src={formData.avatar} alt='' />
              </div>
              <div className='details-box'>
                <div className='four'>
                  <p id='name'>{formData.fullName}</p>
                  <p>{formData.email}</p>
                  <p
                    id='type
                  '
                  >
                    VIP
                  </p>
                  <p id='ticketfor'>1</p>
                </div>
                <div className='textarea'>{formData.request}</div>
              </div>
            </div>
            <img src={bar} alt='' id='bar' />
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
