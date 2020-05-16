import * as React from 'react'
import Link from 'next/link'
import { WordLinkProps } from '../interfaces'

type Props = {
  word: WordLinkProps
}

const WordLink: React.FunctionComponent<Props> = ({ word }) => (
  <Link href="/words/[slug]" as={`/words/${word.slug}`}>
    <a>
      {word.label}
    </a>
  </Link>
)

export default WordLink
