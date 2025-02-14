import Parent from './parent';
import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

// const IMGBB_API_KEY = 'e91e5451e0752ddfd84f86cfa8e00cfe';

const Attendee = ({ setTicketData }) => {
  const navigate = useNavigate();
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData
      ? JSON.parse(savedData)
      : { fullName: '', email: '', avatarUrl: '' };
  });

  const [previewImage, setPreviewImage] = useState(formData.avatarUrl || null);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    avatarUrl: '',
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Form validation
  const validateForm = () => {
    let valid = true;
    let newErrors = { fullName: '', email: '', avatarUrl: '' };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.avatarUrl.trim()) {
      newErrors.avatarUrl = 'Avatar is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Upload image and get Imgbb URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    setPreviewImage(URL.createObjectURL(file)); // Show preview before upload

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=e91e5451e0752ddfd84f86cfa8e00cfe`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: data.data.url, // ✅ Autofill the URL input
        }));
        setErrors((prev) => ({ ...prev, avatarUrl: '' }));
      } else {
        setErrors((prev) => ({ ...prev, avatarUrl: 'Image upload failed' }));
      }
    } catch (error) {
      console.error('Upload failed', error);
      setErrors((prev) => ({ ...prev, avatarUrl: 'Failed to upload image' }));
    }
  };

  // React Dropzone for drag-and-drop image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        uploadImage(acceptedFiles[0]);
      }
    },
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem('ticketData', JSON.stringify(formData));
    setTicketData(formData);
    navigate('/ticket');
  };

  return (
    <Parent>
      <div className='ticket-head'>
        <h1>Attendee Details</h1>
        <p>Step 2/3</p>
      </div>
      <div className='progressContainer'>
        <div className='progressBar'></div>
      </div>

      <div className='ticket-body'>
        <div className='attendee-inner'>
          <p>Upload Profile Photo</p>
          <div className='dark-bg'>
            <div {...getRootProps()} className='dropzone'>
              <input className='drop-text' {...getInputProps()} />
              <div className='cloudicon'>
                <img src='/src/assets/cloudicon.svg' alt='' />
                <p> drag and drop or click to upload</p>
              </div>
              <div className='preview-container'>
                {previewImage && (
                  <img src={previewImage} alt='preview' className='preview' />
                )}
              </div>
            </div>
          </div>
        </div>
        {errors.avatarUrl && (
          <p style={{ color: 'red' }} className='upload'>
            {errors.avatarUrl}
          </p>
        )}
        <hr />
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <p>Enter your name</p>
            <input
              type='text'
              ref={fullNameRef}
              placeholder='Full Name'
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                // setErrors({ ...errors, fullName: '' });
              }}
              // onKeyDown={(e) => handleKeyDown(e, emailRef)}
              required
            />
            {errors.fullName && <p className='error'>{errors.fullName}</p>}
          </div>

          <div className='input-group'>
            <p>Enter your email *</p>

            <input
              type='email'
              ref={emailRef}
              placeholder='Email'
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              // onKeyDown={(e) => handleKeyDown(e, null)}
              style={{ borderColor: errors.fullName ? 'red' : 'black' }}
              required
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div className='input-group'>
            <p>Image Url</p>
            <input
              type='text'
              placeholder='Image URL'
              value={formData.avatarUrl}
              onChange={(e) =>
                setFormData({ ...formData, avatarUrl: e.target.value })
              } // ✅ Allow manual edits
            />
            {errors.avatarUrl && (
              <p style={{ color: 'red' }}>{errors.avatarUrl}</p>
            )}
          </div>

          {/* <input type="file" accept='image/*' onChange={handleFileChange} ref={fileInputRef} hidden />
           */}

          <div className='attendeebtn'>
            <button onClick={() => navigate('/')}>Back</button>
            <button type='submit'>Get My Free Ticket</button>
          </div>
        </form>
      </div>
    </Parent>
  );
};

export default Attendee;
