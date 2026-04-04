export interface DocsMeta {
  title: string
  description?: string
  version?: string
  logoUrl?: string
}

export interface NavChild {
  id: string
  label: string
  slug: string
  status?: 'draft' | 'final' | 'deprecated'
}

export interface NavItem {
  id: string
  label: string
  slug?: string
  status?: 'draft' | 'final' | 'deprecated'
  children?: NavChild[]
}

export interface NavSection {
  id: string
  label: string
  items: NavItem[]
}

export interface DocsPage {
  title: string
  content: string
  lastUpdated?: string
  type?: 'prd' | 'adr' | 'guide' | 'reference'
}

export interface DocsConfig {
  meta: DocsMeta
  navigation: NavSection[]
  pages: Record<string, DocsPage>
}

export interface DocsLayoutProps {
  data: DocsConfig
  activeSlug: string
  onSlugChange: (slug: string) => void
}
