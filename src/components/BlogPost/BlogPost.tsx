import './BlogPost.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Components } from 'react-markdown'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'

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
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <a href={href ?? '#'} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <Box
          mb="4"
          style={{
            borderRadius: 'var(--brand-radius-lg)',
            border: '1px solid var(--border-soft)',
            backgroundColor: 'var(--bg-raised)',
            overflowX: 'auto',
          }}
        >
          <code
            className={className ?? ''}
            style={{
              display: 'block',
              padding: 'var(--sp-4)',
              fontSize: 'var(--brand-text-sm)',
              fontFamily: 'var(--brand-font-mono)',
              color: 'var(--text-primary)',
            }}
          >
            {children}
          </code>
        </Box>
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
      {children}
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
      {children}
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
      {children}
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
