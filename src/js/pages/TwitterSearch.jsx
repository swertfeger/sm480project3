import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as TwitterAPI from "../api/TwitterAPI";
import * as TwitterActions from "../actions/TwitterActions";

import { map, orderBy } from "lodash";
import Input from "../components/Input";
import "./TwitterSearch.scss";
import InfoPopUp from "../components/InfoPopUp";
import Icon from "../components/Icon";

import VerticalChart from "../components/VerticalChart";
import LineChart from "../components/LineChart";
import AreaChart from "../components/AreaChart";
import PieChart from "../components/PieChart";

function TwitterSearch(props) {
  const [selectedTweet, setSelectedTweet] = useState(null);

  useEffect(() => {
    if(!props.tweets) {
      props.searchTweets("suess");
    }
  }, []);


  const onTweetClick = (tweet) => {
    setSelectedTweet(tweet)
  };


  const mostRetweeted = props.tweets
    ? orderBy(props.tweets, ["public_metrics.retweet_count"], ["desc"])
    : [];

  const top10Retweets = map(mostRetweeted.slice(0, 10), (tweet) => ({
    text: tweet.text,
    id: tweet.id,
    count: tweet.public_metrics.retweet_count,
  }));

  console.log("PROPS.TWEETS: ", props.tweets);

  return (
    <div className='layout'>
      <nav className='nav'>
        <Link to={"/"}>
          <svg
            width='76'
            height='26'
            viewBox='0 0 76 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='nav__logo'
          >
            <circle cx='12' cy='12' r='10' stroke='#3288ED' strokeWidth='4' />
            <path
              d='M32.8415 21L34.137 17.0199H40.4353L41.7307 21H45.6853L39.6682 3.54545H34.9125L28.887 21H32.8415ZM35.0745 14.1392L37.2222 7.53409H37.3586L39.5063 14.1392H35.0745ZM47.2379 25.9091H50.8686V18.9034H50.9794C51.4822 19.9943 52.5817 21.2131 54.6953 21.2131C57.6783 21.2131 60.005 18.8523 60.005 14.4716C60.005 9.97159 57.576 7.73864 54.7038 7.73864C52.5135 7.73864 51.4652 9.04261 50.9794 10.108H50.8175V7.90909H47.2379V25.9091ZM50.7919 14.4545C50.7919 12.1193 51.7805 10.6278 53.5447 10.6278C55.343 10.6278 56.2976 12.1875 56.2976 14.4545C56.2976 16.7386 55.326 18.3239 53.5447 18.3239C51.7976 18.3239 50.7919 16.7898 50.7919 14.4545ZM61.9454 25.9091H65.5761V18.9034H65.6869C66.1897 19.9943 67.2892 21.2131 69.4028 21.2131C72.3858 21.2131 74.7125 18.8523 74.7125 14.4716C74.7125 9.97159 72.2835 7.73864 69.4113 7.73864C67.221 7.73864 66.1727 9.04261 65.6869 10.108H65.525V7.90909H61.9454V25.9091ZM65.4994 14.4545C65.4994 12.1193 66.488 10.6278 68.2522 10.6278C70.0505 10.6278 71.0051 12.1875 71.0051 14.4545C71.0051 16.7386 70.0335 18.3239 68.2522 18.3239C66.5051 18.3239 65.4994 16.7898 65.4994 14.4545Z'
              fill='#3288ED'
            />
          </svg>
        </Link>

        <Input className='nav__search' placeholder='Search tweets...' onUpdate={props.searchTweets}/>
      </nav>

      <main className='main'>
        <section className='section section--tweets'>
          <h1 className='section__heading'>Tweets</h1>
          <div className='section__content'>
            {/* Button */}
            {map(mostRetweeted.slice(0, 10), (tweet) => (
              <div className='tweet' onClick={() => onTweetClick(tweet)}>
                <div
                  className='tweet__avatar'
                  style={{
                    backgroundImage: `url(${tweet.user.profile_image_url})`,
                  }}
                />
                <div className='tweet__content'>
                  <div className='tweet__author'>
                    <div className='tweet__name'>{tweet.user.name}</div>
                    <div className='tweet__username'>
                      @{tweet.user.username}
                    </div>
                  </div>
                  <div className='tweet__message'>{tweet.text}</div>
                  <div className='tweet__stats'>
                    <div className='tweet__stat'>
                      <Icon type='reply' />
                      <div className='tweet__stat-count'>
                        {tweet.public_metrics.reply_count}
                      </div>
                    </div>
                    <div className='tweet__stat'>
                      <Icon type='retweet' />
                      <div className='tweet__stat-count'>
                        {tweet.public_metrics.retweet_count}
                      </div>
                    </div>
                    <div className='tweet__stat'>
                      <Icon type='like' />
                      <div className='tweet__stat-count'>
                        {tweet.public_metrics.like_count}
                      </div>
                    </div>
                  </div>
                  <div className='tweet__images' />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='section section--graph'>
          <h1 className='section__heading'>Graph</h1>
          <div className='section__content'>
            <VerticalChart />
            <LineChart />
            <AreaChart />
            <PieChart />
          </div>
        </section>
      </main>

      {!!selectedTweet && (  // NOT NOT selectedTweet converts from string to Boolean
        <InfoPopUp
          show={onTweetClick}
          tweet={selectedTweet}
          hidePopUp={() => setSelectedTweet(null)}
        />
      )}
    </div>
  );
}

export default connect((state) => ({
  tweets: state.twitter.tweets,
  loading: state.twitter.loading,
}), (dispatch) => ({
  searchTweets: (query) => dispatch(TwitterActions.SearchTweets(query))
}))(TwitterSearch);
