import './BlogPost.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'
import type { ReactNode } from 'react'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'

const HEX_SPLIT_REGEX = /(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3})(?![0-9A-Fa-f])/
const HEX_EXACT_REGEX = /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/

function ColorSwatch({ hex }: { hex: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', verticalAlign: 'middle' }}>
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          backgroundColor: hex,
          borderRadius: '2px',
          border: '1px solid rgba(255,255,255,0.2)',
          flexShrink: 0,
        }}
      />
      {hex}
    </span>
  )
}

function injectColorSwatches(node: ReactNode): ReactNode {
  if (typeof node === 'string') {
    const parts = node.split(HEX_SPLIT_REGEX)
    if (parts.length === 1) return node
    return parts.map((part, i) =>
      HEX_EXACT_REGEX.test(part) ? <ColorSwatch key={i} hex={part} /> : part
    )
  }
  if (Array.isArray(node)) {
    return node.flatMap((child) => {
      const result = injectColorSwatches(child)
      return Array.isArray(result) ? result : [result]
    })
  }
  return node
}

export interface BlogPostProps {
  content: string
}

const markdownComponents: Components = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      size="7"
      mb="4"
      style={{ fontFamily: 'var(--brand-font-display)', color: 'var(--text-primary)' }}
    >
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      size="5"
      mb="3"
      mt="6"
      style={{ fontFamily: 'var(--brand-font-display)', color: 'var(--text-primary)' }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      size="4"
      mb="2"
      mt="5"
      style={{ fontFamily: 'var(--brand-font-display)', color: 'var(--text-secondary)' }}
    >
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text
      as="p"
      size="3"
      mb="4"
      style={{
        fontFamily: 'var(--brand-font-body)',
        color: 'var(--text-secondary)',
        lineHeight: 'var(--brand-leading-relaxed)',
        display: 'block',
      }}
    >
      {injectColorSwatches(children)}
    </Text>
  ),
  a: ({ href, children }) => (
    <a href={href ?? '#'} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
      {children}
    </a>
  ),
  pre: ({ children }) => (
    <Box
      mb="4"
      style={{
        borderRadius: 'var(--brand-radius-lg)',
        border: '1px solid var(--border-soft)',
        backgroundColor: 'var(--bg-raised)',
        overflowX: 'auto',
      }}
    >
      <pre style={{ margin: 0, padding: 'var(--sp-4)' }}>{children}</pre>
    </Box>
  ),
  code: ({ className, children }) => {
    const isBlock = !!className?.startsWith('language-')
    if (isBlock) {
      return (
        <code
          className={className ?? ''}
          style={{
            fontSize: 'var(--brand-text-sm)',
            fontFamily: 'var(--brand-font-mono)',
            color: 'var(--text-primary)',
          }}
        >
          {children}
        </code>
      )
    }
    const hexText = typeof children === 'string' ? children : ''
    if (HEX_EXACT_REGEX.test(hexText)) {
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', verticalAlign: 'middle' }}>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: hexText,
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
            }}
          />
          <code
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: 'var(--accent-bright)',
              borderRadius: 'var(--brand-radius-sm)',
              padding: '2px 6px',
              fontSize: 'var(--brand-text-sm)',
              fontFamily: 'var(--brand-font-mono)',
            }}
          >
            {children}
          </code>
        </span>
      )
    }
    return (
      <code
        style={{
          backgroundColor: 'var(--bg-raised)',
          color: 'var(--accent-bright)',
          borderRadius: 'var(--brand-radius-sm)',
          padding: '2px 6px',
          fontSize: 'var(--brand-text-sm)',
          fontFamily: 'var(--brand-font-mono)',
        }}
      >
        {children}
      </code>
    )
  },
  ul: ({ children }) => (
    <ul
      style={{
        marginBottom: 'var(--sp-4)',
        paddingLeft: 'var(--sp-4)',
        listStyleType: 'disc',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--brand-font-body)',
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      style={{
        marginBottom: 'var(--sp-4)',
        paddingLeft: 'var(--sp-4)',
        listStyleType: 'decimal',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--brand-font-body)',
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <Text
      as="p"
      size="3"
      mb="1"
      style={{
        fontFamily: 'var(--brand-font-body)',
        color: 'var(--text-secondary)',
        display: 'list-item',
      }}
    >
      {injectColorSwatches(children)}
    </Text>
  ),
  blockquote: ({ children }) => (
    <Box
      mb="4"
      pl="4"
      py="2"
      style={{
        borderLeft: '2px solid var(--accent)',
        backgroundColor: 'var(--accent-subtle)',
        borderRadius: '0 var(--brand-radius-md) var(--brand-radius-md) 0',
      }}
    >
      {children}
    </Box>
  ),
  table: ({ children }) => (
    <Box mb="4" style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 'var(--brand-text-sm)',
          fontFamily: 'var(--brand-font-body)',
        }}
      >
        {children}
      </table>
    </Box>
  ),
  th: ({ children }) => (
    <th
      style={{
        textAlign: 'left',
        padding: '8px 12px',
        borderBottom: '1px solid var(--border-mid)',
        color: 'var(--text-primary)',
        fontWeight: 500,
      }}
    >
      {injectColorSwatches(children)}
    </th>
  ),
  td: ({ children }) => (
    <td
      style={{
        padding: '8px 12px',
        borderBottom: '1px solid var(--border-subtle)',
        color: 'var(--text-secondary)',
      }}
    >
      {injectColorSwatches(children)}
    </td>
  ),
  hr: () => (
    <Flex my="6">
      <Separator size="4" />
    </Flex>
  ),
}

export function BlogPost({ content }: BlogPostProps) {
  return (
    <article className="blog-post">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
