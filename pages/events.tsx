import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Post from '../components/Post';

const Events = ({ events }) => (
    <Layout title="Home | Next.js + TypeScript Example">

        <Hero
            title="Events"
            description="I’ve been fortunate enough to speak at a few events and be interviewed by a few writers and blogs."
            actions={[
                { href: '/contact', children: 'Let\'s chat' }
            ]}
        />

        <ul>
            {events.map(() => (
                <li>Event</li>
            ))}
        </ul>

    </Layout>
);

export async function getStaticProps() {
    return {
        props: {
            events: [],
        },
    }
}

export default Events;