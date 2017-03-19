import React from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout  } from '../../containers/EventList';
import { Layout } from '../../containers/Layout';
import { fixtureApi } from '../../services';

export default class Index extends React.Component {
  static async getInitialProps () {
    const events = await fixtureApi.getAllEvents();
    return { events };
  }

  render () {
    return (
      <Layout>
        <Header />
        <EventList events={this.props.events} />
        <Footer />
      </Layout>
    );
  }
}
