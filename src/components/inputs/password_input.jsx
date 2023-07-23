import { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
    
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    onChange(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  const validatePassword = (password) => {
    return password !== '' ? true : false
  };
  return (
    <div className="input-each">
        <span id="input-content">Şifre</span>
        <input
          type="password"
          name="admin_password"
          id="admin_password"
          placeholder='Şifre Giriniz'
          inputMode='text'
          title='Şifre'
          value={value}
          onChange={handlePasswordChange}
          required
        />
        {!isPasswordValid && <span id="error-input">*Şifre boş bırakılamaz</span>}
    </div>
  );
};

export default PasswordInput;