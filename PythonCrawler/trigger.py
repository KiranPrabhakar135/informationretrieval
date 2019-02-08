import json
import os
from datetime import date, timedelta

import TweetFormatter as Tf
import TweetManager as Tm
import constants as cs
import input as ip
from query_to_topics import query_to_topics

START_DATE = date(2018, 4, 1)
END_DATE = date(2018, 7, 1)
OUTPUT_DIRECTORY_PATH = "tweets.nosync/"


# Initiating script for a date range.
def main():
    os.chdir(OUTPUT_DIRECTORY_PATH)
    date_range = ip.get_date_range_for_input(START_DATE, END_DATE)

    # Fetched date range. Now create input set:
    for single_date in date_range:
        since_date = single_date.strftime("%Y-%m-%d")
        until_date = single_date + timedelta(5)
        until_date = until_date.strftime("%Y-%m-%d")
        for query in query_to_topics:
            for city in cs.cities:
                for l in cs.lang:
                    for r in cs.radius:
                        query_search = query['query']
                        output_file_name = "{}_{}_{}_{}.json".format(query_search, city, l, r)
                        tweet_criteria = ip.get_tweet_criteria_from_inputs(query_search, False, 1000, since_date,
                                                                           until_date, city, r, output_file_name, l)
                        Tm.get_tweets_for_input(tweet_criteria,
                                                ip.get_query_metadata_from_tweet_criteria(tweet_criteria,
                                                                                          query['topic'], city),
                                                receive_buffer)


def receive_buffer(tweets, query_metadata, output_file_name):
    output_file = open(output_file_name, "a+")
    output_file.seek(0)
    saved_json_list = []
    try:
        saved_json_list = json.load(output_file)
        output_file.seek(0)
        output_file.truncate()
    except Exception:
        print(Exception)

    saved_json_list.extend(Tf.parse_tweet_list_to_json(tweets, query_metadata))
    json.dump(saved_json_list, output_file, indent=2)
    output_file.flush()
    output_file.close()
    print('More %d tweets saved on file...\n' % len(tweets))


if __name__ == '__main__':
    main()
