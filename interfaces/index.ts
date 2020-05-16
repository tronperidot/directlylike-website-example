// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export interface Word {
  slug: string;
  name: string;
  description: string;
}

export interface WordLinkProps {
  slug: string;
  label: string;
}

export interface TagInfo {
  tag: 'span' | 'link';
  slug?: string;
  outerText: string;
}