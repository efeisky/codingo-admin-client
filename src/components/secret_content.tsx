import { useRef, useState } from 'react';
import './css/secret_content.css'
interface SecretContentProps {
    show_content: string;
    secret_content: string;
}

const SecretShowContent: React.FC<SecretContentProps> = ({ show_content, secret_content }) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
  
    const handleToggleContent = () => {
      setIsContentVisible(!isContentVisible);
    };
  
    return (
      <div className='secret-area'>
        <div className="secret-text">{isContentVisible ? secret_content : show_content}</div>
        <button className="secret-button" onClick={handleToggleContent}>{!isContentVisible ? 'Göster' : 'Kapat'}</button>
      </div>
    );
  };

const SecretCopyContent: React.FC<SecretContentProps> = ({ show_content, secret_content }) => {
    const [isCopied, setIsCopied] = useState(false)
    const copyMessage = useRef<HTMLDivElement>(null);
    const copyToClipboard = async() => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(secret_content);
            setIsCopied(true)
            setTimeout(() => {
              setIsCopied(false);
              if (copyMessage.current) {
                copyMessage.current.style.animation = '';
              }
            }, 2000);
            if (copyMessage.current) {
              copyMessage.current.style.animation = 'fadeOut 5s ease';
            }
            } else {
            console.error('Clipboard writeText method is not supported in this browser.');
            }
        } catch (error) {
            console.error('Failed to copy secret content:', error);
        }
    };
  return (
    <div className='secret-area'>
      <div className="secret-text">{show_content}</div>
      <button className="secret-button" onClick={copyToClipboard}>
        <img src="/assests/image/copy_icon.svg" alt="Copy Icon" title="Copy"/>
      </button>
      {isCopied && <div className="copied-message" ref={copyMessage}>Mesaj Kopyalandı</div>}
    </div>
  );
};

export {
  SecretShowContent,
  SecretCopyContent
};
