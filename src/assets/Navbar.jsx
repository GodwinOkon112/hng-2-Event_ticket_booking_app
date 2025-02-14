import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div>
        <img src='src/assets/logo.svg' alt='' />
      </div>

      <ul>
        <NavLink to='/'>
          <li>Events</li>
        </NavLink>

        <NavLink to='/attendee'>
          <li>My Ticket</li>
        </NavLink>

        <NavLink to='/attendees'>
          <li>About Project</li>
        </NavLink>
      </ul>
      <button onClick={() => navigate('/attendee')}>MY TICKET &#8594; </button>
    </div>
  );
};

export default Navbar;
