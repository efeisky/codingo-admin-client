import { useState } from 'react';

const EmailInput = ({ value, onChange }) => {
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    onChange(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const validateEmail = (email) => {
    if (email === '') {
        return false
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="input-each">
      <span id="input-content">Mail Adresi</span>
      <input
        type="email"
        name="admin_email"
        id="admin_email"
        placeholder="Mail Adresi Giriniz"
        autoFocus
        inputMode="email"
        title="Mail Adresi"
        value={value}
        onChange={handleEmailChange}
        required
      />
      {!isEmailValid && <span id="error-input">*Geçersiz Mail Adresi</span>}
    </div>
  );
};

export default EmailInput;