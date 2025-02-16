import Parent from './parent';
import { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';

const imgbbkey = 'e91e5451e0752ddfd84f86cfa8e00cfe';

const Attendee = () => {
  const [formData, setFormData] = useState({
    fullName: localStorage.getItem('fullName') || '',
    email: localStorage.getItem('email') || '',
    avatar: localStorage.getItem('avatar') || '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const avatarRef = useRef(null);
  const submitRef = useRef(null);

  const handleKeyDown = (e, next, prevRef) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      next?.current?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      prevRef?.current?.focus();
    }
  };

  useEffect(() => {
    localStorage.setItem('fullName', formData.fullName);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('avatar', formData.avatar);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.avatar) {
      navigate('/ticket', { state: formData });
    }
    const { fullName, email, avatar } = formData;
    let error = {};

    if (!fullName) error.fullName = 'Full Name is required.';
    if (!email) error.email = 'Email is required.';
    if (!avatar) {
      error.avatar = 'Avatar URL is required.';
    } else if (!avatar.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/)) {
      error.avatar =
        'Invalid image URL  n  ';
    }

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbkey}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, avatar: data.data.url }));
        setErrors((prev) => ({ ...prev, avatar: '' }));
      } else {
        setErrors((prev) => ({ ...prev, avatar: 'Image upload failed.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, avatar: 'Upload Error' }));
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        handleImageUpload(file);
      }
    },
  });

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
              {isDragActive ? (
                <p> drop the image here...</p>
              ) : (
                <div className='cloudicon'>
                  <img src='/src/assets/cloudicon.svg' alt='' />
                  <p> drag and drop or click to upload</p>
                </div>
              )}
              <div className='preview-container'>
                {preview && (
                  <img src={preview} alt='preview' className='preview' />
                )}
              </div>
            </div>
          </div>
        </div>
        {uploading && <p className='upload'>Uploading...</p>}
        <hr />
        <form>
          <div className='input-group'>
            <p>Enter your name</p>
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef, submitRef)}
              ref={fullNameRef}
              autoFocus
            />
            {errors.fullName && <p className='error'>{errors.fullName}</p>}
          </div>

          <div className='input-group'>
            <p>Enter your email *</p>

            <input
              type='email'
              name='email'
              placeholder=' hello@avioflagos.io'
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, avatarRef, fullNameRef)} // 🔹 Moves up & down
              ref={emailRef}
            />
            {errors.email && <p className='error'>{errors.email}</p>}
          </div>

          <div className='input-group'>
            <p>Image Url</p>

            <input
              type='url'
              name='avatar'
              placeholder='Image URL(auto-filled)'
              value={formData.avatar}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, submitRef, emailRef)}
              ref={avatarRef}
            />
            {errors.avatar && <p className='error'>{errors.avatar}</p>}
          </div>

          {/* <input type="file" accept='image/*' onChange={handleFileChange} ref={fileInputRef} hidden />
           */}

          <div className='attendeebtn'>
            <button>
              <Link to={'/'}>Back</Link>
            </button>
            <button type='submit' onClick={handleSubmit} ref={submitRef}>
              Get My Free Ticket
            </button>
          </div>
        </form>
      </div>
    </Parent>
  );
};

export default Attendee;
