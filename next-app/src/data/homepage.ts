import { fetchGraphQL, gql } from '../graphql';
import type { HomepageQuery } from '../.generated/types';

export type HomepageData = {
  posts: NonNullable<HomepageQuery['posts']>;
  links: NonNullable<HomepageQuery['links']>;
  categories: NonNullable<HomepageQuery['categories']>;
  meta: NonNullable<HomepageQuery['metas']>[number] | null;
  config: NonNullable<HomepageQuery['configs']>[number] | null;
};

export async function fetchHomepageData(): Promise<HomepageData> {
  const data: HomepageQuery = await fetchGraphQL(gql`
    query homepage {
      categories {
        name
      }
      posts(where: { status: { equals: published } }, orderBy: { publishDate: desc }) {
        __typename
        id
        title
        slug
        status
        category {
          name
        }
        publishDate
        metaDescription
        metaImageUrl
        metaImageAltText
        metaImageWidth
        metaImageHeight
        content {
          document
        }
      }
      links(where: { status: { equals: published } }, orderBy: { publishDate: desc }) {
        __typename
        id
        title
        url
        status
        category {
          name
        }
        publishDate
      }
      metas {
        __typename
        id
        email
        title
        about {
          document
        }
        name
        github
        twitter
        metaTitle
        metaDescription
        metaImageUrl
        metaImageAltText
        metaImageWidth
        metaImageHeight
        metaUrl
      }
      configs {
        __typename
        id
        theme
        homepageFeedStyle
      }
    }
  `);

  const posts = data?.posts || [];
  const links = data?.links || [];
  const categories = data?.categories || [];
  const meta = data?.metas?.length ? data?.metas[0] : null;
  const config = data?.configs?.length ? data?.configs[0] : null;

  return {
    posts,
    links,
    categories,
    meta,
    config,
  };
}
