import type { GetStaticProps, NextPage } from 'next';
import { useWindowScroll } from 'react-use';
import Layout from "../components/layout";
import Client from "../components/client";
import Section from "../components/section";
import Post from "../components/post";
import Outlink from "../components/outlink";
import { getMediumPosts } from "../utils/medium";
import { getDevPosts } from "../utils/dev";
import styles from "./home.module.css";
import { plaintext, queryAt, richtext } from "../utils/prismic";
import PrismicImage from "../components/prismicImage";

type IHome = {
  data: {
    title: string;
    description: string;
    asterisk: PrismicImage;
    hero_titles: { hero_title: PrismicRichText }[];
    hero_subtitle: PrismicRichText;
    hero_action_text: string;
    hero_action_link: PrismicLink;
    selected_work_title: PrismicRichText;
    selected_work: { work: PrismicLink & { data: PrismicRole }}[];
    selected_work_link: PrismicLink;
    selected_work_cta: string;
    journal_title: PrismicRichText;
    journal_cta: string;
    journal_link: PrismicLink;
    projects_title: PrismicRichText;
    projects: { project: PrismicLink & { data: PrismicProject }}[];
    projects_cta: string;
    projects_link: PrismicLink;
  },
  mediumPosts: IPost[];
  devPosts: IPost[];
  settings: PrismicSettings;
};

const Home: NextPage<IHome> = ({ data, settings, mediumPosts, devPosts }) => {
  const { y } = useWindowScroll();

  return (
    <Layout
      title={data.title}
      description={data.description}
      settings={settings}
    >
      <Section>
        <div className={styles.heroLeft}>
          <div className={styles.asterisk} style={{ transform: `rotate(${y / 3}deg)` }}>
            <PrismicImage
              src={data.asterisk}
              layout="fixed"
              width={48}
              height={48}
              alt="Hello there"
              priority
            />
          </div>
        </div>
        <div className={styles.heroRight}>
          {data.hero_titles.map(({ hero_title }, index) => (
            <div key={index} className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: richtext(hero_title, false, { hyperlink: Client }) }} />
          ))}
          <div className={styles.outlink}>
            <Outlink text={data.hero_action_text} link={data.hero_action_link} />
          </div>
        </div>
      </Section>

      <Section title={data.selected_work_title}>
        {data.selected_work.map(({ work }) => (
          <div key={work.uid} className={styles.work}>
            <Post
              image={work.data.image}
              video={work.data.video}
              title={`${work.data.title} at ${work.data.description}`}
              description={plaintext(work.data.content)}
              caption={work.data.date}
              link={work}
            />
          </div>
        ))}
        <Outlink link={data.selected_work_link} text={data.selected_work_cta} />
      </Section>

      <Section title={data.journal_title}>
        <div className={styles.designPosts}>
          {mediumPosts.slice(0, 2).map((post) => (
            <Post
              key={post.id}
              {...post}
            />
          ))}
        </div>

        <div className={styles.technicalPosts}>
          {devPosts.slice(0, mediumPosts.length < 2 ? 4 : 3).map((post) => (
            <Post
              key={post.id}
              {...post}
              compact
            />
          ))}
        </div>

        <Outlink link={data.journal_link} text={data.journal_cta} />
      </Section>

      <Section title={data.projects_title}>
        {data.projects.map(({ project }) => (
          <div key={project.uid} className={styles.project}>
            <Post
              image={project.data.image}
              title={project.data.title}
              description={plaintext(project.data.content)}
              status={project.data.status}
              link={project}
            />
          </div>
        ))}
        <Outlink link={data.projects_link} text={data.projects_cta} />
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await queryAt('document.type', 'home', {
    fetchLinks: [
      'role.image',
      'role.title',
      'role.description',
      'role.date',
      'role.content',
      'project.image',
      'project.title',
      'project.description',
      'project.status',
      'project.content',
    ]
  });
  const { data: settings } = await queryAt('document.type', 'settings');
  const mediumPosts = await getMediumPosts();
  const devPosts = await getDevPosts();

  return {
    props: {
      data,
      settings,
      mediumPosts,
      devPosts,
    },
  };
}

export default Home;
