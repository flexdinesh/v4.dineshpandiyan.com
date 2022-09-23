import React from 'react';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faGithub,
  faDev,
  faTwitter,
  faMedium,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faPodcast, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import type { CategoryNameType } from '../../../.generated/types';
import type { HomepageData } from '../../../data/homepage';

const categoryIcon: Record<CategoryNameType, IconDefinition | null> = {
  blog: null,
  notes: null,
  github: faGithub,
  twitter: faTwitter,
  dev: faDev,
  medium: faMedium,
  youtube: faYoutube,
  podcast: faPodcast,
  talk: faMicrophoneLines,
} as const;

const categoryIconTooltip: Record<CategoryNameType, string | null> = {
  blog: null,
  notes: null,
  dev: 'External link to a Dev.to blog post',
  github: 'External link to a GitHub repo',
  medium: 'External link to a Medium blog post',
  podcast: 'External link to a podcast',
  twitter: 'External link to a tweet',
  youtube: 'External link to a YouTube video',
  talk: 'External link to a Talk',
} as const;

function StyledSpan({
  children,
  className = '',
}: React.HTMLAttributes<HTMLSpanElement> & { children: React.ReactNode }) {
  return (
    <span
      className={`
        transition-[background-size] duration-300 
        bg-gradient-to-r bg-left-bottom bg-no-repeat
        bg-[length:0%_55%] hover:bg-[length:100%_55%] dark:bg-[length:0%_2px] hover:dark:bg-[length:100%_2px]
        from-primary-200 to-primary-200 dark:from-primary-500 dark:to-primary-500
        ${className}
      `}
    >
      {children}
    </span>
  );
}

function BlogItem({ post }: { post: HomepageData['posts'][number] }) {
  return (
    <NextLink href={`/blog/${post.slug}`}>
      <a>
        <StyledSpan>{post.title}</StyledSpan>
      </a>
    </NextLink>
  );
}

function LinkItem({
  link,
  showCategoryIcon = false,
}: {
  link: HomepageData['links'][number];
  showCategoryIcon: boolean;
}) {
  const title = (link.category?.name && categoryIconTooltip[link.category.name]) || '';
  const icon = link.category?.name ? categoryIcon[link.category?.name] : null;
  const renderedIcon = icon ? <FontAwesomeIcon icon={icon} /> : null;

  return (
    <NextLink href={link?.url || ''} passHref>
      <a target={'_blank'}>
        <StyledSpan className="pr-2">{link.title}</StyledSpan>
        {showCategoryIcon && link.category?.name && <span title={title}>{renderedIcon}</span>}
      </a>
    </NextLink>
  );
}

export function ListItem({
  postOrLink,
  showCategoryIcon = false,
}: {
  postOrLink: HomepageData['posts'][number] | HomepageData['links'][number];
  showCategoryIcon: boolean;
}) {
  const formattedDate = postOrLink.publishDate
    ? format(new Date(postOrLink.publishDate), 'MMM dd, yyyy')
    : null;

  return (
    <li
      className="
        relative 
        pl-4 
        mb-4 
        grid 
        grid-cols-[1fr] 
        sm:grid-cols-[1fr_auto] 
        before:left-0 
        before:absolute 
        before:content-['»'] 
        before:text-text-muted 
        dark:before:text-text-muted"
      key={postOrLink.id}
    >
      <div className="pr-8">
        {postOrLink.__typename === 'Post' ? (
          <BlogItem post={postOrLink} />
        ) : (
          <LinkItem link={postOrLink} showCategoryIcon={showCategoryIcon} />
        )}
      </div>
      {formattedDate ? (
        <div>
          <span
            className="
              justify-self-end
              text-sm 
              text-text-muted 
              dark:text-text-muted"
          >
            {formattedDate}
          </span>
        </div>
      ) : null}
    </li>
  );
}
