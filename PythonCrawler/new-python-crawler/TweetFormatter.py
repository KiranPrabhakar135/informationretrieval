import datetime
import json as lib_json
import re

from pyquery import PyQuery

import model


def parse_tweet_list_from_tweets_html(tweets_html):
    results = []
    for tweet_html in tweets_html:
        tweet = model.Tweet()
        tweet_parsed = PyQuery(tweet_html)
        tweet.id = int(tweet_parsed.attr("data-tweet-id"))
        if tweet.id is None:
            tweet.id = int(tweet_parsed.attr("data-item-id"))
        tweet.user_id = int(tweet_parsed.attr("data-user-id"))
        tweet.screen_name = tweet_parsed("span:first.username.u-dir b").text()
        tweet.permalink = 'https://twitter.com' + tweet_parsed.attr("data-permalink-path")
        tweet.user_name = tweet_parsed("span.FullNameGroup strong").text()
        tweet.profile_image_url = tweet_parsed("img.avatar").attr("src")
        if tweet.profile_image_url is not None:
            tweet.profile_image_url = tweet.profile_image_url.replace('_bigger', '_400x400')
        tweet.text = tweet_parsed("p.js-tweet-text.tweet-text").text().replace('# ', '#').replace('@ ', '@')
        tweet.created_at = datetime.datetime.fromtimestamp(
            int(tweet_parsed("small.time span.js-short-timestamp").attr("data-time"))).isoformat() + 'Z'
        # .strftime("%a %b %d %H:%M:%S %z %Y")
        tweet.data_reply_to_user_json = lib_json.loads(tweet_parsed.attr("data-reply-to-users-json"))
        tweet.re_tweets = int(tweet_parsed('span.ProfileTweet-action--retweet span.ProfileTweet-actionCount').attr(
            'data-tweet-stat-count'))
        tweet.favorites = int(tweet_parsed('span.ProfileTweet-action--favorite span.ProfileTweet-actionCount').attr(
            'data-tweet-stat-count'))
        tweet.hashtags = [x for x in (re.compile('(#\\w*)').findall(tweet.text))]
        tweet.urls = tweet_parsed("p.js-tweet-text.tweet-text").find("a.twitter-timeline-link")

        # tweet.data_expanded_urls = [x for x in (
        #     tweet_parsed("p.js-tweet-text.tweet-text a.twitter-timeline-link").attr('data-expanded-url'))]
        # tweet.urls = [x for x in (tweet_parsed("p.js-tweet-text.tweet-text a.twitter-timeline-link").attr('href'))]
        # tweet.display_urls = [x for x in (
        #     tweet_parsed("p.js-tweet-text.tweet-text a.twitter-timeline-link span.js-display-url").text())]
        results.append(tweet)
    return results


def parse_tweet_list_to_json(tweet_list, query_metadata):
    formatted_tweet_list = []
    for tweet in tweet_list:
        formatted_tweet = dict()
        formatted_tweet['queryMetadata'] = query_metadata
        formatted_tweet['created_at'] = tweet.created_at
        formatted_tweet['id'] = tweet.id
        formatted_tweet['text'] = tweet.text
        formatted_tweet['user'] = {
            'name': tweet.user_name,
            'id': tweet.user_id,
            'screen_name': tweet.screen_name,
            'profile_image_url': tweet.profile_image_url
        }

        formatted_tweet['coordinates'] = {
            'coordinates': [],
            'type': ""
        }
        formatted_tweet['entities'] = {'user_mentions': [], 'hashtags': [], 'urls': [], 'media': [], 'symbols': []}
        if tweet.data_reply_to_user_json is not None:
            for user_mention in tweet.data_reply_to_user_json:
                if int(user_mention['id_str']) != tweet.user_id:
                    temp = dict()
                    temp['id'] = int(user_mention['id_str'])
                    temp['screen_name'] = user_mention['screen_name']
                    temp['name'] = user_mention['name']
                    temp['id_str'] = str(user_mention['id_str'])
                    formatted_tweet['entities']['user_mentions'].append(temp)
        if tweet.hashtags is not None:
            for hashtag in tweet.hashtags:
                temp = dict()
                temp['text'] = hashtag
                formatted_tweet['entities']['hashtags'].append(temp)
        if tweet.urls is not None:
            for url in tweet.urls:
                temp = dict()
                url_parsed = PyQuery(url)
                temp['url'] = url_parsed.attr('href')
                temp['expanded_url'] = url_parsed.attr('data-expanded-url')
                temp['display_url'] = url_parsed.text()
                formatted_tweet['entities']['urls'].append(temp)

        formatted_tweet['favorite_count'] = tweet.favorites
        formatted_tweet['retweet_count'] = tweet.re_tweets
        formatted_tweet_list.append(formatted_tweet)
    return formatted_tweet_list
