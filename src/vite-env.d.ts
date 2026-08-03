/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCK: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_URLT: string
  readonly VITE_BASE_IMG: string
  readonly VITE_BASE_PDF: string
  readonly VITE_BASE_PDFEVENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
