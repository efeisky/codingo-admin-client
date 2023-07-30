import { useState } from 'react';
import './css/custom_selectbox.css';
import Option from '../interfaces/select_option_interface';
  
interface CustomSelectProps {
  options: Option[];
  default: string;
  onSelected: (option: Option) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, default: defaultValue, onSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleSelect = (option: Option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onSelected(option);
    };
  
    return (
      <div className="custom-select">
        <div
          className="custom-select select-box"
          onClick={() => setIsOpen(!isOpen)}
          tabIndex={0}
          onBlur={() => setIsOpen(false)}
        >
          <div id='selected-option'>
            {selectedOption ? selectedOption.label : (defaultValue !== '' && defaultValue !== '0') ? defaultValue : "Henüz Seçilmedi"}
          </div>
          {isOpen && (
            <div className="custom-select-dropdown">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="custom-select-option"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default CustomSelect;
