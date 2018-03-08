import React, { Component } from 'react';
import axios from 'services/axios';
import Helmet from 'react-helmet';
import Input from 'react-toolbox/lib/input';
import { Link } from 'react-router-dom';
import { Button } from 'react-toolbox/lib/button';

import Player from './Player';

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      playlistId: '',
    };
  }

  onSearch() {
    const { playlistId } = this.state;

    axios.get('https://www.googleapis.com/youtube/v3/playlistItems',
      {
        params: {
          playlistId,
          maxResults: 25,
          part: 'snippet',
          key: process.env.REACT_APP_YOUTUBE_KEY,
        },
      })
      .then((rs) => rs.data)
      .then((rs) => this.setState({ list: rs.items || [] }));
  }

  render() {
    const { list, playlistId } = this.state;

    console.log(list);

    return (
      <div className="youtube-pages">
        <Helmet
          title="Youtubepage of reactjs begin"
          meta={[
            { name: 'description', content: 'Start project reactjs and node on in one. Rerender server support for seo on reactjs' },
            { name: 'keyword', content: 'reactjs, redux, render server, nodejs' },
          ]}
        />
        <div>
          <div className="form-searching">
            <Input
              value={playlistId}
              style={{ flex: 1 }}
              label="Play list Id"
              hint="PLBCF2DAC6FFB574DE"
              onChange={(text) => this.setState({ playlistId: text })}
            />
            <Button
              mini
              primary
              floating
              icon="search"
              onClick={() => this.onSearch()}
            />
          </div>
          <Link to="/instagram">Go to instagram</Link>
          <Player playlists={list} />
        </div>
      </div>
    );
  }
}

export default Youtube;
