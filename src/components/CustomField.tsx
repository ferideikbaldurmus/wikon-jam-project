import { Calendar, Link as LinkIcon } from 'lucide-react';

interface CustomFieldProps {
  label: string;
  type?: 'text' | 'date' | 'link' | 'number';
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CustomField({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  disabled = false
}: CustomFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm flex items-center gap-1" style={{ color: '#293241' }}>
        {label}
        {required && <span style={{ color: '#EE6C4D' }}>*</span>}
      </label>
      
      <div className="relative">
        {type === 'date' && (
          <Calendar 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" 
            style={{ color: '#3D5A80' }} 
          />
        )}
        {type === 'link' && (
          <LinkIcon 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" 
            style={{ color: '#3D5A80' }} 
          />
        )}

        <input
          type={type === 'link' ? 'url' : type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full p-3 rounded-lg transition-all ${type === 'date' || type === 'link' ? 'pl-10' : ''} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          style={{ 
            border: '1px solid rgba(61, 90, 128, 0.2)',
            color: '#293241',
            backgroundColor: disabled ? '#F3F4F6' : 'white'
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = '#EE6C4D';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(238, 108, 77, 0.1)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(61, 90, 128, 0.2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
