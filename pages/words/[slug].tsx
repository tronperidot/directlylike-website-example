import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import { words } from '../../words';
import Layout from '../../components/Layout';
import { Word, TagInfo } from '../../interfaces';
import WordLink from '../../components/WordLink';

type Props = {
  name: string;
  contents: TagInfo[]
}

export default class StaticPropsDetail extends React.Component<Props> {
  render() {
    const { name, contents } = this.props
    return (
      <Layout title={name}>
        <h1>{name}</h1>
        <div>{contents.map((content) => {
          if (content.tag === 'span') return (<span>{content.innerText}</span>)
          if (content.tag === 'link') return (<WordLink word={{ slug: content.slug!, label: content.innerText }} />)
        })}</div>
      </Layout>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = words.map(word => ({
    params: { slug: word.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const item = words.find(data => data.slug === params?.slug)

    const contents = words.reduce((prev, word) => {
      const items = prev.map((info) => {
        if (info.tag === 'link') return info
        const descriptions = info.innerText.split(word.name)
        const tagItems = parseToTagBlock(descriptions, word)
        return tagItems
      })
      return Array.prototype.concat.apply([], items)
    }, [{ tag: 'span', innerText: item?.description }] as TagInfo[])

    return { props: { name: item?.name, contents } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}

const parseToTagBlock = (descriptions: string[], word: Word) => (
  descriptions.reduce((prev, text, idx) => {
    prev.push({ tag: 'span', innerText: text });
    if (idx <= descriptions.length - 2) {
      prev.push({ tag: 'link', innerText: word.name, slug: word.slug });
    }
    return prev;
  }, [] as TagInfo[])
)
