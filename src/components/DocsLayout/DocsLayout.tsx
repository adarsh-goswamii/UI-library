import { Badge, Box, Flex, Heading, Separator, Text, ScrollArea } from '@radix-ui/themes'
import { NavSidebar } from './NavSidebar'
import { MarkdownContent } from './MarkdownContent'
import type { DocsLayoutProps, DocsPage } from './types'

type PageType = NonNullable<DocsPage['type']>

const PAGE_TYPE_COLORS: Record<PageType, 'violet' | 'blue' | 'green' | 'gray'> = {
  prd: 'violet',
  adr: 'blue',
  guide: 'green',
  reference: 'gray',
}

function PageTypeBadge({ type }: { type: PageType }) {
  return (
    <Badge size="1" variant="soft" color={PAGE_TYPE_COLORS[type]}>
      {type.toUpperCase()}
    </Badge>
  )
}

export function DocsLayout({ data, activeSlug, onSlugChange }: DocsLayoutProps) {
  const { meta, navigation, pages } = data
  const page = pages[activeSlug]

  return (
    <Flex direction="column" style={{ height: '100vh', backgroundColor: 'var(--bg-base)' }}>
      {/* Body */}
      <Flex direction="row" style={{ flex: 1, overflow: 'hidden' }}>
        <NavSidebar
          meta={meta}
          navigation={navigation}
          activeSlug={activeSlug}
          onSlugChange={onSlugChange}
        />

        {/* Content area */}
        <Box style={{ flex: 1, overflow: 'hidden', backgroundColor: 'var(--bg-base)' }}>
          <ScrollArea scrollbars="vertical" style={{ height: '100%' }}>
            <Box p="8" style={{ maxWidth: '768px', margin: '0 auto' }}>
              {!page ? (
                <Flex align="center" justify="center" style={{ height: '300px' }}>
                  <Text size="3" style={{ color: 'var(--text-muted)' }}>
                    Page not found
                  </Text>
                </Flex>
              ) : (
                <>
                  {/* Page meta */}
                  <Flex align="center" gap="3" mb="3">
                    {page.type && <PageTypeBadge type={page.type} />}
                    {page.lastUpdated && (
                      <Text
                        size="1"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--brand-font-body)' }}
                      >
                        Updated {page.lastUpdated}
                      </Text>
                    )}
                  </Flex>

                  {/* Page title */}
                  <Heading
                    as="h1"
                    size="8"
                    mb="4"
                    style={{
                      fontFamily: 'var(--brand-font-display)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {page.title}
                  </Heading>
                  <Separator size="4" mb="6" />

                  {/* Markdown body */}
                  <MarkdownContent content={page.content} />
                </>
              )}
            </Box>
          </ScrollArea>
        </Box>
      </Flex>
    </Flex>
  )
}
