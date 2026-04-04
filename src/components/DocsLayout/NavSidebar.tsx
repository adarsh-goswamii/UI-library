import { Badge, Box, Flex, Heading, ScrollArea, Separator, Text } from '@radix-ui/themes'
import type { DocsMeta, NavSection, NavItem, NavChild } from './types'

type Status = NonNullable<NavItem['status']>

function NavStatusBadge({ status }: { status: Status }) {
  if (status === 'final') return null
  return (
    <Badge size="1" variant="soft" color={status === 'draft' ? 'yellow' : 'gray'}>
      {status}
    </Badge>
  )
}

function NavLeaf({
  id,
  label,
  slug,
  status,
  activeSlug,
  onSlugChange,
}: {
  id: string
  label: string
  slug: string
  status?: Status
  activeSlug: string
  onSlugChange: (slug: string) => void
}) {
  const isActive = slug === activeSlug
  const isDeprecated = status === 'deprecated'

  return (
    <Box key={id} mb="1">
      <button
        type="button"
        onClick={() => onSlugChange(slug)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <Flex
          align="center"
          justify="between"
          gap="2"
          px="2"
          py="1"
          className={[
            'rounded-md transition-colors',
            isActive
              ? 'bg-[var(--accent-subtle)] text-accent'
              : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary',
          ].join(' ')}
          style={{ minHeight: '30px' }}
        >
          <Text
            as="span"
            size="2"
            weight={isActive ? 'medium' : 'regular'}
            style={{
              fontFamily: 'var(--brand-font-body)',
              textDecoration: isDeprecated ? 'line-through' : undefined,
            }}
          >
            {label}
          </Text>
          {status && <NavStatusBadge status={status} />}
        </Flex>
      </button>
    </Box>
  )
}

function NavItemRow({
  item,
  activeSlug,
  onSlugChange,
}: {
  item: NavItem
  activeSlug: string
  onSlugChange: (slug: string) => void
}) {
  // Leaf node at item level
  if (item.slug) {
    return (
      <NavLeaf
        id={item.id}
        label={item.label}
        slug={item.slug}
        status={item.status}
        activeSlug={activeSlug}
        onSlugChange={onSlugChange}
      />
    )
  }

  // Grouping node
  return (
    <Box mb="1">
      <Flex align="center" justify="between" gap="2" px="2" py="1">
        <Text
          as="p"
          size="2"
          weight="medium"
          style={{
            fontFamily: 'var(--brand-font-body)',
            color: 'var(--text-secondary)',
            textDecoration: item.status === 'deprecated' ? 'line-through' : undefined,
          }}
        >
          {item.label}
        </Text>
        {item.status && <NavStatusBadge status={item.status} />}
      </Flex>
      {item.children && item.children.length > 0 && (
        <Box pl="3">
          {item.children.map((child: NavChild) => (
            <NavLeaf
              key={child.id}
              id={child.id}
              label={child.label}
              slug={child.slug}
              status={child.status}
              activeSlug={activeSlug}
              onSlugChange={onSlugChange}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

interface NavSidebarProps {
  meta: DocsMeta
  navigation: NavSection[]
  activeSlug: string
  onSlugChange: (slug: string) => void
}

export function NavSidebar({ meta, navigation, activeSlug, onSlugChange }: NavSidebarProps) {
  return (
    <Box
      style={{
        width: '256px',
        flexShrink: 0,
        height: '100%',
        borderRight: '1px solid var(--border-soft)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Identity block */}
      <Box
        px="4"
        py="3"
        style={{ borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}
      >
        <Flex align="center" gap="2">
          {meta.logoUrl && (
            <img src={meta.logoUrl} alt={meta.title} style={{ height: '20px', width: 'auto' }} />
          )}
          <Heading
            as="h2"
            size="3"
            style={{ fontFamily: 'var(--brand-font-display)', color: 'var(--text-primary)' }}
          >
            {meta.title}
          </Heading>
          {meta.version && (
            <Badge size="1" variant="soft" color="violet">
              {meta.version}
            </Badge>
          )}
        </Flex>
      </Box>

      {/* Nav sections */}
      <ScrollArea scrollbars="vertical" style={{ flex: 1 }}>
        <Box p="4">
          {navigation.map((section: NavSection, sectionIndex: number) => (
            <Box key={section.id} mb="4">
              <Text
                as="p"
                size="1"
                weight="medium"
                mb="2"
                style={{
                  fontFamily: 'var(--brand-font-body)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--brand-tracking-wider)',
                  marginTop: sectionIndex === 0 ? 0 : undefined,
                }}
              >
                {section.label}
              </Text>
              <Separator size="4" mb="2" />
              {section.items.map((item: NavItem) => (
                <NavItemRow
                  key={item.id}
                  item={item}
                  activeSlug={activeSlug}
                  onSlugChange={onSlugChange}
                />
              ))}
            </Box>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  )
}
