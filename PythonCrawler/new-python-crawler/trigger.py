import json
import os
import os.path
from datetime import date, timedelta

import TweetFormatter as Tf
import TweetManager as Tm
import constants as cs
import input as ip
from query_to_topics import query_to_topics

### ANUJ: START_DATE = date(2018, 4, 1) and END_DATE = date(2018, 8, 1)
### ANUJ: START_DATE = date(2018, 8, 1) and END_DATE = date(2018, 12, 1)
### RAMAN: START_DATE = date(2017, 8, 1) and END_DATE = date(2017, 12, 1)

START_DATE = date(2018, 9, 30)
END_DATE = date(2018, 11, 20)
TIME_DELTA = 10
OUTPUT_DIRECTORY_PATH = "tweets3/"


# Initiating script for a date range.
def main():
    os.chdir(OUTPUT_DIRECTORY_PATH)
    date_range = ip.get_date_range_for_input(START_DATE, END_DATE, TIME_DELTA)

    # Fetched date range. Now create input set:
    for single_date in date_range:
        since_date = single_date.strftime("%Y-%m-%d")
        until_date = single_date + timedelta(TIME_DELTA)
        until_date = until_date.strftime("%Y-%m-%d")
        for query in query_to_topics:
            for city in cs.cities:
                for l in cs.lang:
                    query_search = query['query']
                    output_file_name = "{}_{}_{}_{}_{}_{}.json".format(query_search, city, l, 1000, since_date,
                                                                       until_date)
                    tweet_criteria = ip.get_tweet_criteria_from_inputs(query_search, False, 1000, since_date,
                                                                       until_date, city, 1000, output_file_name, l,
                                                                       False)
                    Tm.get_tweets_for_input(tweet_criteria, ip.get_query_metadata_from_tweet_criteria(tweet_criteria,
                                                                                                      query['topic'],
                                                                                                      city),
                                            True, receive_buffer)
            for l in cs.lang:
                query_search = query['query']
                output_file_name = "{}_{}_{}_{}_{}_{}_lang.json".format(query_search, '', l, 1000, since_date,
                                                                        until_date)

                tweet_criteria = ip.get_tweet_criteria_from_inputs(query_search, False, 1000, since_date,
                                                                   until_date, '', 1000, output_file_name, l, True)
                city = tweet_criteria['near']
                Tm.get_tweets_for_input(tweet_criteria, ip.get_query_metadata_from_tweet_criteria(tweet_criteria,
                                                                                                  query['topic'], city),
                                        False, receive_buffer)


def receive_buffer(tweets, query_metadata, output_file_name):
    # output_file = open(output_file_name, "a+")
    try:
        if os.path.exists(output_file_name):
            output_file = open(output_file_name, "a+")
            output_file.seek(0)
            saved_json = json.load(output_file)
        else:
            output_file = open(output_file_name, "a+")
            saved_json = json.loads("[]")

        saved_json.extend(Tf.parse_tweet_list_to_json(tweets, query_metadata))

        output_file.truncate()
        json.dump(saved_json, output_file, indent=2)
        output_file.flush()
        output_file.close()
    except Exception as e:
        print(e)
    print('More %d tweets saved on file...\n' % len(tweets))


if __name__ == '__main__':
    main()
