import React, { Component } from 'react';
import axios from 'services/axios';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      url: '',
      page: {},
    };

    this.renderItem = this.renderItem.bind(this);
  }

  onSearch(maxId) {
    const { url = '', list = [] } = this.state;
    const link = url.replace(/\/\?().*/g, '');

    axios.get(`${link}/?__a=1&${!!maxId && ['max_id', maxId].join('=')}`)
      .then((rs) => rs.data)
      .then((rs) => {
        const { media } = rs.user;
        this.setState({ list: [...(!!maxId && list), ...media.nodes], page: media.page_info });
      });
  }

  renderItem(item, index) {
    return (
      <a href={`https://www.instagram.com/p/${item.code}`} key={index} target="_blank">
        <img src={item.thumbnail_src} alt={item.caption} />
      </a>
    );
  }

  render() {
    const { list = [], url, page = {} } = this.state;

    return (
      <div className="instagram-pages">
        <Helmet
          title="Instagram of reactjs begin"
          meta={[
            { name: 'description', content: 'Start project reactjs and node on in one. Rerender server support for seo on reactjs' },
            { name: 'keyword', content: 'reactjs, redux, render server, nodejs' },
          ]}
        />
        <div>
          <div className="form-searching">
            <Input
              value={url}
              style={{ flex: 1 }}
              label="Instagram url"
              hint="https://www.instagram.com/abc"
              onChange={(text) => this.setState({ url: text })}
            />
            <Button
              mini
              primary
              floating
              icon="search"
              onClick={() => this.onSearch()}
            />
          </div>
          <Link to="/">Go to youtube</Link>
          <div className="images">
            {list.map(this.renderItem)}
          </div>
          {
            page.has_next_page &&
            <Button
              raised
              primary
              label="More"
              style={{ margin: 5 }}
              onClick={() => this.onSearch(page.end_cursor)}
            />
          }
        </div>
      </div>
    );
  }
}

export default Youtube;
