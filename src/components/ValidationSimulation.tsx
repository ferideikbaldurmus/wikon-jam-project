import { useState } from 'react';
import { Play, CheckCircle, AlertTriangle, XCircle, Edit3, Shield } from 'lucide-react';
import { Language } from '../utils/translations';
import { getRoleName } from '../utils/roleUtils';

interface ValidationCheck {
  id: string;
  label: string;
  status: 'ok' | 'warn' | 'error';
}

interface ValidationSimulationProps {
  onPublish?: () => void;
  requiredRole?: number;
  userRole?: number;
  checks?: string[];
  language: Language;
  onBackToEdit?: () => void;
}

export function ValidationSimulation({ 
  onPublish, 
  requiredRole = 4, 
  userRole = 1, 
  checks = [],
  language,
  onBackToEdit
}: ValidationSimulationProps) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{
    content: ValidationCheck[];
    roleOk: boolean;
  } | null>(null);

  const t = {
    TR: {
      title: 'Validasyon Simülasyonu',
      subtitle: 'Yayınlamadan önce kontrol edin.',
      startSimulation: 'Simülasyonu Başlat',
      running: 'Kontrol Ediliyor...',
      backToEdit: 'Düzenlemeye Dön',
      noSimulation: 'Henüz simülasyon çalıştırılmadı.',
      roleCheck: 'Rol Kontrolü',
      sufficient: 'Yeterli',
      insufficient: 'Yetersiz',
      minRole: 'Minimum Rol',
      contentChecks: 'İçerik Kontrolleri',
      success: 'Başarılı',
      warning: 'Uyarı',
      error: 'Hata',
      publish: 'Yayınla',
      cannotPublish: 'Yayınlanamaz',
      allChecksPassed: 'Tüm kontroller başarılı!',
      hasErrors: 'Bazı hatalar düzeltilmeli.'
    },
    EN: {
      title: 'Validation Simulation',
      subtitle: 'Check before publishing.',
      startSimulation: 'Start Simulation',
      running: 'Checking...',
      backToEdit: 'Back to Edit',
      noSimulation: 'No simulation run yet.',
      roleCheck: 'Role Check',
      sufficient: 'Sufficient',
      insufficient: 'Insufficient',
      minRole: 'Minimum Role',
      contentChecks: 'Content Checks',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      publish: 'Publish',
      cannotPublish: 'Cannot Publish',
      allChecksPassed: 'All checks passed!',
      hasErrors: 'Some errors must be fixed.'
    }
  }[language];

  function run() {
    setRunning(true);
    setTimeout(() => {
      const res = {
        content: checks.map((c, i) => ({
          id: `check-${i}`,
          label: c,
          status: (
            Math.random() > 0.85 ? 'error' : 
            Math.random() > 0.6 ? 'warn' : 
            'ok'
          ) as 'ok' | 'warn' | 'error'
        })),
        roleOk: userRole >= requiredRole,
      };
      setResults(res);
      setRunning(false);
    }, 1200);
  }

  const canPublish = results && results.roleOk && !results.content.some(c => c.status === 'error');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm" style={{ border: '1px solid rgba(61, 90, 128, 0.1)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5" style={{ color: '#EE6C4D' }} />
            <h4 className="text-lg" style={{ color: '#293241' }}>{t.title}</h4>
          </div>
          <p className="text-sm" style={{ color: '#3D5A80' }}>{t.subtitle}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={run} 
            disabled={running}
            className="px-4 py-2 rounded-lg transition-all hover:shadow-md flex items-center gap-2 disabled:opacity-60"
            style={{ backgroundColor: '#3D5A80', color: 'white' }}
            onMouseOver={(e) => !running && (e.currentTarget.style.backgroundColor = '#293241')}
            onMouseOut={(e) => !running && (e.currentTarget.style.backgroundColor = '#3D5A80')}
          >
            {running ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.running}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {t.startSimulation}
              </>
            )}
          </button>
          
          {onBackToEdit && (
            <button 
              onClick={onBackToEdit}
              className="px-4 py-2 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
              style={{ backgroundColor: '#E5E7EB', color: '#293241' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
            >
              <Edit3 className="w-4 h-4" />
              {t.backToEdit}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div>
        {!results && (
          <div className="text-center py-12" style={{ color: '#98C1D9' }}>
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div>{t.noSimulation}</div>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            {/* Role Check */}
            <div>
              <div className="text-sm mb-2" style={{ color: '#3D5A80' }}>{t.roleCheck}</div>
              <div 
                className={`p-4 rounded-lg flex items-center justify-between`}
                style={{ 
                  backgroundColor: results.roleOk ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${results.roleOk ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}
              >
                <div className="flex items-center gap-3">
                  {results.roleOk ? (
                    <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
                  ) : (
                    <XCircle className="w-5 h-5" style={{ color: '#EF4444' }} />
                  )}
                  <div>
                    <div style={{ color: '#293241' }}>
                      {results.roleOk ? t.sufficient : t.insufficient}
                    </div>
                    {!results.roleOk && (
                      <div className="text-sm" style={{ color: '#EF4444' }}>
                        {t.minRole}: {getRoleName(requiredRole, language)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm" style={{ color: '#3D5A80' }}>
                  {getRoleName(userRole, language)}
                </div>
              </div>
            </div>

            {/* Content Checks */}
            {results.content.length > 0 && (
              <div>
                <div className="text-sm mb-2" style={{ color: '#3D5A80' }}>{t.contentChecks}</div>
                <div className="space-y-2">
                  {results.content.map(check => (
                    <div
                      key={check.id}
                      className="p-3 rounded-lg flex items-center justify-between"
                      style={{ 
                        backgroundColor: 
                          check.status === 'ok' ? 'rgba(16, 185, 129, 0.1)' : 
                          check.status === 'warn' ? 'rgba(245, 158, 11, 0.1)' : 
                          'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${
                          check.status === 'ok' ? 'rgba(16, 185, 129, 0.3)' : 
                          check.status === 'warn' ? 'rgba(245, 158, 11, 0.3)' : 
                          'rgba(239, 68, 68, 0.3)'
                        }`
                      }}
                    >
                      <div className="text-sm" style={{ color: '#293241' }}>{check.label}</div>
                      <div className="flex items-center gap-2">
                        {check.status === 'ok' && (
                          <>
                            <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                            <span className="text-sm" style={{ color: '#10B981' }}>{t.success}</span>
                          </>
                        )}
                        {check.status === 'warn' && (
                          <>
                            <AlertTriangle className="w-4 h-4" style={{ color: '#F59E0B' }} />
                            <span className="text-sm" style={{ color: '#F59E0B' }}>{t.warning}</span>
                          </>
                        )}
                        {check.status === 'error' && (
                          <>
                            <XCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
                            <span className="text-sm" style={{ color: '#EF4444' }}>{t.error}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary & Publish */}
            <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(61, 90, 128, 0.1)' }}>
              <div className="text-sm" style={{ color: canPublish ? '#10B981' : '#EF4444' }}>
                {canPublish ? `✓ ${t.allChecksPassed}` : `✖ ${t.hasErrors}`}
              </div>
              <button 
                onClick={() => onPublish?.()} 
                disabled={!canPublish}
                className="px-6 py-2 rounded-lg transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: canPublish ? '#10B981' : '#E5E7EB',
                  color: canPublish ? 'white' : '#6B7280'
                }}
                onMouseOver={(e) => canPublish && (e.currentTarget.style.backgroundColor = '#059669')}
                onMouseOut={(e) => canPublish && (e.currentTarget.style.backgroundColor = '#10B981')}
              >
                {canPublish ? t.publish : t.cannotPublish}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
