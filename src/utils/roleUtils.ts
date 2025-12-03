// Role utilities for permission checking and multiplier calculation

export interface RolePermissions {
  canComment: boolean;
  canSuggestEdit: boolean;
  canEditDirectly: boolean;
  canCreateTopic: boolean;
  canApproveEdits: boolean;
  canDeleteContent: boolean;
  canModerate: boolean;
  maxCommentsPerHour: number;
  multiplier: number;
}

export function getRolePermissions(roleId: number): RolePermissions {
  switch (roleId) {
    case 1: // Yeni Gelen (Newcomer)
      return {
        canComment: true,
        canSuggestEdit: true,
        canEditDirectly: false,
        canCreateTopic: false,
        canApproveEdits: false,
        canDeleteContent: false,
        canModerate: false,
        maxCommentsPerHour: 5,
        multiplier: 1.0
      };
    
    case 2: // Seyyah (Traveler)
      return {
        canComment: true,
        canSuggestEdit: true,
        canEditDirectly: true,
        canCreateTopic: false,
        canApproveEdits: false,
        canDeleteContent: false,
        canModerate: false,
        maxCommentsPerHour: -1, // Unlimited
        multiplier: 1.2
      };
    
    case 3: // Gezgin (Explorer)
      return {
        canComment: true,
        canSuggestEdit: true,
        canEditDirectly: true,
        canCreateTopic: true,
        canApproveEdits: false,
        canDeleteContent: false,
        canModerate: false,
        maxCommentsPerHour: -1, // Unlimited
        multiplier: 1.5
      };
    
    case 4: // Kaşif Meraklısı (Curious Explorer)
      return {
        canComment: true,
        canSuggestEdit: true,
        canEditDirectly: true,
        canCreateTopic: true,
        canApproveEdits: true,
        canDeleteContent: true,
        canModerate: true,
        maxCommentsPerHour: -1, // Unlimited
        multiplier: 2.0
      };
    
    case 5: // Konya Bilgesi (Konya Wise)
      return {
        canComment: true,
        canSuggestEdit: true,
        canEditDirectly: true,
        canCreateTopic: true,
        canApproveEdits: true,
        canDeleteContent: true,
        canModerate: true,
        maxCommentsPerHour: -1, // Unlimited
        multiplier: 2.5
      };
    
    default:
      return getRolePermissions(1); // Default to Newcomer
  }
}

export function calculateCoinReward(baseAmount: number, roleId: number): number {
  const permissions = getRolePermissions(roleId);
  return Math.round(baseAmount * permissions.multiplier);
}

export function getRoleName(roleId: number, language: 'TR' | 'EN'): string {
  const roles = {
    1: { TR: 'Yeni Gelen', EN: 'Newcomer' },
    2: { TR: 'Seyyah', EN: 'Traveler' },
    3: { TR: 'Gezgin', EN: 'Explorer' },
    4: { TR: 'Kaşif Meraklısı', EN: 'Curious Explorer' },
    5: { TR: 'Konya Bilgesi', EN: 'Konya Wise' }
  };
  
  return roles[roleId as keyof typeof roles]?.[language] || roles[1][language];
}
