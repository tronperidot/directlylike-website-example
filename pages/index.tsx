import Layout from '../components/Layout'
import { GetStaticProps } from 'next'
import { words } from '../words'
import { WordLinkProps } from '../interfaces'
import React from 'react'
import WordLink from '../components/WordLink'

type Props = {
  items: WordLinkProps[]
}

export default class IndexPage extends React.Component<Props> {
  render() {
    const { items } = this.props

    return (
      <Layout title="Home">
        <h1>word link lists</h1>
        <ul>
          {items.map((word) => (
            <li><WordLink word={word} /></li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const items = words.map((word) => ({
      slug: word.slug,
      label: word.name
    }))
    return { props: { items } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
