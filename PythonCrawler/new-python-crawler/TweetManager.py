from pyquery import PyQuery

import TweetFormatter as Tf
import TwitterClient as Tc


def get_tweets_for_input(tweet_criteria, query_metadata, should_query_for_city, receive_buffer=None):
    print("Fetching results for :: Query : {0} Language : {1} City : {2} Range : {3} From: {4} Till: {5}".format(
        tweet_criteria['query'], tweet_criteria['language'], tweet_criteria['near'], tweet_criteria['within'],
        tweet_criteria['since'], tweet_criteria['until']))

    buffer_length = 100
    refresh_cursor = ''
    results = []
    results_aux = []

    active = True

    while active:
        try:
            tweet_response_json = Tc.getJsonReponse(tweet_criteria, should_query_for_city, refresh_cursor)
        except Exception as e:
            tweet_response_json = None
            break
        if len(tweet_response_json['items_html'].strip()) == 0:
            break

        refresh_cursor = tweet_response_json['min_position']
        scraped_tweets = PyQuery(tweet_response_json['items_html'])
        # Remove incomplete tweets withheld by Twitter Guidelines
        scraped_tweets.remove('div.withheld-tweet')
        tweets = scraped_tweets('div.js-stream-tweet')

        if len(tweets) == 0:
            break
        temp = Tf.parse_tweet_list_from_tweets_html(tweets)
        results.extend(temp)
        results_aux.extend(temp)
        print("Fetched {0} results from Twitter API. {1} / {2}, has more items: {3}".format(len(temp), len(results),
                                                                                            tweet_criteria[
                                                                                                "max_tweets"],
                                                                                            tweet_response_json[
                                                                                                'has_more_items']))
        # if receive_buffer and len(results_aux) >= buffer_length:
        #     receive_buffer(results_aux, query_metadata, tweet_criteria["output_file_name"])
        #     results_aux = []

        # if len(results) >= tweet_criteria["max_tweets"] >= 0 or tweet_response_json['has_more_items'] is False:
        if len(results) >= tweet_criteria["max_tweets"]:
            active = False

    if receive_buffer and len(results_aux) > 0:
        receive_buffer(results_aux, query_metadata, tweet_criteria["output_file_name"])

    return results
