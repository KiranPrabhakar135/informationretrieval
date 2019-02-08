from datetime import datetime, timedelta, timezone


def get_date_range_for_input(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)


def get_tweet_criteria_from_inputs(query, top_tweets, max_tweets, since, until, near, within, output_file_name,
                                   language):
    tweet_criteria = dict()
    tweet_criteria['query'] = query
    tweet_criteria['top_tweets'] = top_tweets
    tweet_criteria['max_tweets'] = max_tweets
    tweet_criteria['since'] = since
    tweet_criteria['until'] = until
    if near == "mexico city":
        near = "CDMX"
    tweet_criteria['near'] = near
    tweet_criteria['within'] = within
    tweet_criteria['output_file_name'] = output_file_name
    tweet_criteria['language'] = language
    return tweet_criteria


def get_city_by_city_code(city_code):
    if city_code == "nyc":
        return "\"New York, USA\""
    elif city_code == "delhi":
        return "\"Delhi, India\""
    elif city_code == "mexico city":
        return "\"Mexico City, Mexico\""
    elif city_code == "paris":
        return "\"Paris, France\""
    elif city_code == "bangkok":
        return "\"Bangkok, Thailand\""
    else:
        print('Couldn\'t recognise city')
        return "\"nyc\""


def get_query_metadata_from_tweet_criteria(tweet_criteria, topic, near):
    query_metadata = {
        'query': tweet_criteria['query'],
        'query_topic': topic,
        'query_city': near,
        'query_city_range': tweet_criteria['within'],
        'query_language': tweet_criteria['language'],
        'query_time': int(datetime.now(tz=timezone.utc).timestamp() * 1000)
    }
    return query_metadata
