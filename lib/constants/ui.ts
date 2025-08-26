// Component Size Configurations
export const COMPONENT_SIZES = {
  avatar: {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
  },
  spinner: {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  },
  modal: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg', 
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  },
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

// Common Messages
export const UI_MESSAGES = {
  loading: 'Carregando...',
  noResults: 'Nenhum resultado encontrado',
  error: 'Algo deu errado',
  success: 'Operação realizada com sucesso',
  saving: 'Salvando...',
  deleting: 'Excluindo...',
  updating: 'Atualizando...',
  confirm: 'Tem certeza?',
  confirmDelete: 'Tem certeza que deseja excluir?',
  cancel: 'Cancelar',
  save: 'Salvar',
  delete: 'Excluir',
  edit: 'Editar',
  view: 'Ver',
  close: 'Fechar',
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;