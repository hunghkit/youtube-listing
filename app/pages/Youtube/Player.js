import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import classnames from 'classnames';

class YouTubeListing extends Component {
  static propTypes = {
    playlists: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      player: null,
      autoplay: 0,
    };

    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
  }

  onPrev() {
    this.carousel.prev();
  }

  onNext() {
    this.carousel.next();
  }

  onSlideChange(current) {
    this.setState({ current });
  }

  onEnd() {
    this.onNext();
  }

  onPlay() {
    if (!this.state.autoplay) this.setState({ autoplay: 1 });
  }

  onPause() {
    if (this.state.autoplay === 1) this.setState({ autoplay: 0 });
  }

  onReady(event) {
    this.setState({ player: event.target });
  }

  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }

  renderItem(item, index) {
    const { snippet = {} } = item;
    if (snippet.title === 'Private video') return null;

    return (
      <div
        key={index}
        onClick={() => this.setState({ current: index })}
        className={classnames('item-cover', { current: index === this.state.current })}
      >
        <img src={((snippet.thumbnails || {}).default || {}).url} alt={snippet.title} />
      </div>
    );
  }

  get renderCurrent() {
    const { current = 0, autoplay } = this.state;
    const { playlists = [] } = this.props;
    const item = playlists[current];

    if (!item) {
      return <img width="100%" src="http://euonthemove.eu/wp-content/uploads/2017/05/no-video.jpg" alt="No video" />;
    }

    return (
      <div style={{ padding: '0 10px' }}>
        <YouTube
          opts={{
            height: 430,
            width: '100%',
            maxWidth: 920,
            playerVars: { autoplay },
          }}
          onEnd={this.onEnd}
          onPlay={this.onPlay}
          onPause={this.onPause}
          videoId={item.snippet.resourceId.videoId}
        />
      </div>
    );
  }

  render() {
    const { playlists = [] } = this.props;
    const item = (playlists[0] || {}).snippet || {};

    return (
      <div className="player-youtube-pages">
        <div className="container">
          <h5 className="title">Channel: {item.channelTitle || 'No channel'}</h5>
          <h5 className="title">Title: {item.title || 'No title'}</h5>
          <div className="player-container">
            {this.renderCurrent}
            <div style={{ padding: 10, display: 'flex', flexWrap: 'wrap' }}>
              {playlists.map(this.renderItem)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YouTubeListing;
