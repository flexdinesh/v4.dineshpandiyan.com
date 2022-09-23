import React from 'react';
import type { HomepageData } from '../../../data/homepage';
import type { CategoryNameType } from '../../../.generated/types';
import { ListItem } from './ListItem';

const categoryDisplayName: Record<CategoryNameType, string> = {
  blog: 'Blogs',
  notes: 'Notes',
  twitter: 'Twitter',
  youtube: 'YouTube',
  dev: 'Dev.To',
  github: 'GitHub',
  medium: 'Medium',
  podcast: 'Podcasts',
  talk: 'Talks',
};

function groupBasedOnCategories({ categories, posts, links }: GroupedFeedProps) {
  if (!categories) {
    return null;
  }

  const groupedItems = categories.map(cat => {
    const postsForCategory = posts?.filter(p => p.category?.name === cat.name) || [];
    const linksForCategory = links?.filter(l => l.category?.name === cat.name) || [];
    const groupedAndSortedPostsOrLinks = [...postsForCategory, ...linksForCategory].sort((a, b) =>
      (b?.publishDate || '').localeCompare(a?.publishDate || '')
    );

    if (!groupedAndSortedPostsOrLinks.length) {
      return null;
    }

    return {
      name: cat.name,
      items: groupedAndSortedPostsOrLinks,
    };
  });

  return groupedItems;
}

type GroupedFeedProps = Pick<HomepageData, 'posts' | 'links' | 'categories'>;

export function GroupedFeed({ posts, links, categories }: GroupedFeedProps) {
  if (!posts?.length && !links?.length) {
    return <p>Nothing posts yet, coming back later.</p>;
  }

  const groups = groupBasedOnCategories({ categories, posts, links });

  return (
    <React.Fragment>
      {groups?.map(category => {
        if (!category?.name) {
          return null;
        }

        return (
          <React.Fragment key={category.name}>
            <h2 className="font-semibold text-4xl mt-12 mb-8 leading-[1.3]">
              <span
                className="
                  block pl-8 relative leading-[150%]
                  after:absolute after:content-[''] after:w-3 after:h-full after:top-0 after:left-0 after:bg-secondary-300
                "
              >
                {categoryDisplayName[category.name]}
              </span>
            </h2>
            <ul className="list-none">
              {category.items.map(postOrLink => {
                return (
                  <ListItem postOrLink={postOrLink} key={postOrLink.id} showCategoryIcon={false} />
                );
              })}
            </ul>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
