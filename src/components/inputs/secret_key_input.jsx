import { useState } from 'react';

const SecretKeyInput = ({ value, onChange }) => {
    
  const [isKeyValid, setIsKeyValid] = useState(true);

  const handleKeyChange = (event) => {
    const newPassword = event.target.value;
    onChange(newPassword);
    setIsKeyValid(validateKey(newPassword));
  };

  const validateKey = (password) => {
    return password.length === 512 ? true : false
  };
  return (
    
    <div className="input-each">
        <span id="input-content">512 Bit Gizli Anahtar</span>
        <input
        type="text"
        name="admin_secret_password"
        id="admin_secret_password"
        autoComplete='off'
        placeholder='Anahtar Giriniz'
        minLength={512}
        maxLength={512}
        inputMode='text'
        title='Gizli Anahtar'
        value={value}
        onChange={handleKeyChange}
        required
        />
        {!isKeyValid && <span id="error-input">*Bu alan 512 karakter olmalıdır</span>}
    </div>
  );
};

export default SecretKeyInput;
