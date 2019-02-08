import time
from datetime import timedelta


def get_date_range_for_input(start_date, end_date, time_delta):
    curr = start_date
    while curr < end_date:
        yield curr
        curr += timedelta(time_delta)


def get_tweet_criteria_from_inputs(query, top_tweets, max_tweets, since, until, near, within, output_file_name,
                                   language, automate_city):
    tweet_criteria = dict()
    tweet_criteria['query'] = query
    tweet_criteria['top_tweets'] = top_tweets
    tweet_criteria['max_tweets'] = max_tweets
    tweet_criteria['since'] = since
    tweet_criteria['until'] = until
    # if near == "mexico city":
    #     near = "CDMX"
    if automate_city:
        tweet_criteria['near'] = get_city_by_lanugage_code(language)
    else:
        tweet_criteria['near'] = get_city_by_city_code(near)
    tweet_criteria['within'] = within
    tweet_criteria['output_file_name'] = output_file_name
    tweet_criteria['language'] = language
    return tweet_criteria


def get_city_by_city_code(city_code):
    if city_code == "nyc":
        return "usa"
    elif city_code == "delhi":
        return "india"
    elif city_code == "mexico city":
        return "mexico"
    elif city_code == "paris":
        return "france"
    elif city_code == "bangkok":
        return "thailand"
    else:
        print('Couldn\'t recognise city')
        return "usa"


def get_city_by_lanugage_code(language_code):
    if language_code == "en":
        return "nyc"
    elif language_code == "hi":
        return "delhi"
    elif language_code == "es":
        return "mexico city"
    elif language_code == "fr":
        return "paris"
    elif language_code == "th":
        return "bangkok"
    else:
        print('Couldn\'t recognise language')
        return "nyc"


def get_query_metadata_from_tweet_criteria(tweet_criteria, topic, near):
    query_metadata = {
        'query': tweet_criteria['query'],
        'query_topic': topic,
        'query_city': near,
        'query_city_range': tweet_criteria['within'],
        'query_language': tweet_criteria['language'],
        'query_time': int(time.time() * 1000)
    }
    return query_metadata
