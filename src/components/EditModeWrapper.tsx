import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Language } from '../utils/translations';

interface EditModeWrapperProps {
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  language: Language;
  title?: string;
}

export function EditModeWrapper({ 
  children, 
  onSave, 
  onCancel,
  language,
  title
}: EditModeWrapperProps) {
  const [editing, setEditing] = useState(false);

  const t = {
    TR: {
      editMode: 'Düzenleme Modu',
      edit: 'Düzenle',
      save: 'Kaydet',
      cancel: 'İptal'
    },
    EN: {
      editMode: 'Edit Mode',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel'
    }
  }[language];

  function start() { 
    setEditing(true); 
  }
  
  function cancel() { 
    setEditing(false); 
    onCancel?.(); 
  }
  
  function save() { 
    setEditing(false); 
    onSave?.(); 
  }

  return (
    <div 
      className={`rounded-xl p-4 transition-all ${editing ? 'ring-4' : ''}`}
      style={{ 
        backgroundColor: 'white',
        border: '1px solid rgba(61, 90, 128, 0.1)',
        ringColor: editing ? 'rgba(238, 108, 77, 0.3)' : 'transparent'
      }}
    > 
      <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: 'rgba(61, 90, 128, 0.1)' }}>
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5" style={{ color: editing ? '#EE6C4D' : '#3D5A80' }} />
          <div style={{ color: '#293241' }}>
            {title || t.editMode}
          </div>
          {editing && (
            <span 
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', color: '#EE6C4D' }}
            >
              {language === 'TR' ? 'Aktif' : 'Active'}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {!editing ? (
            <button 
              onClick={start} 
              className="px-4 py-2 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
              style={{ backgroundColor: '#3D5A80', color: 'white' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#293241'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3D5A80'}
            >
              <Edit3 className="w-4 h-4" />
              {t.edit}
            </button>
          ) : (
            <>
              <button 
                onClick={save} 
                className="px-4 py-2 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
                style={{ backgroundColor: '#10B981', color: 'white' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
              >
                <Save className="w-4 h-4" />
                {t.save}
              </button>
              <button 
                onClick={cancel} 
                className="px-4 py-2 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
                style={{ backgroundColor: '#E5E7EB', color: '#293241' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
              >
                <X className="w-4 h-4" />
                {t.cancel}
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { editing });
          }
          return child;
        })}
      </div>
    </div>
  );
}
