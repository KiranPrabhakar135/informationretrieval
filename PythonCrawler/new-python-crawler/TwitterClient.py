import cookielib
import json as lib_json
import sys
import urllib2


def getJsonReponse(tweet_criteria, should_query_for_city, refresh_cursor):
    cookie_jar = cookielib.CookieJar()
    if refresh_cursor == '':
        url = "https://twitter.com/i/search/timeline?f=tweets&vertical=news&q=%s&src=typd&include_available_features=1&include_entities=1&reset_error_state=false&%smax_position=%s"
    else:
        url = "https://twitter.com/i/search/timeline?f=tweets&vertical=news&q=%s&src=typd&include_available_features=1&include_entities=1&reset_error_state=false&%smax_position=%s"

    url_get_data = ''
    url_get_data += tweet_criteria["query"]

    if tweet_criteria["near"] is not None and should_query_for_city is True:
        url_get_data += " near:\"" + tweet_criteria["near"]

    if tweet_criteria["since"] is not None:
        url_get_data += ' since:' + tweet_criteria["since"]

    if tweet_criteria["until"] is not None:
        url_get_data += ' until:' + tweet_criteria["until"]

    if tweet_criteria["language"] is not None:
        urlLang = 'l=' + tweet_criteria["language"] + '&'
    else:
        urlLang = ''

    url = url % (urllib2.quote(url_get_data), urlLang, urllib2.quote(refresh_cursor))
    # print("URLLLL: {0}".format(url))
    # "https://twitter.com/i/search/timeline?f=tweets&vertical=news&q=Trump%20near%3A%22delhi%22%20within%3A15mi%20since%3A2018-04-01%20until%3A2018-04-11&src=typd&include_available_features=1&include_entities=1&reset_error_state=false&min_position="
    # "https://twitter.com/i/search/timeline?f=tweets&vertical=news&q=Trump%20near%3A%22delhi%22%20within%3A15mi%20since%3A2018-12-01%20until%3A2018-12-03&src=typd&include_available_features=1&include_entities=1&reset_error_state=false&max_position=cm%2B55m-aDFJXDXDsEbaJsJssEX-aDFJXbabbDXEavJvDab"
    # url = "https://twitter.com/i/search/timeline?vertical=default&q=%s&l=%s&src=typd&include_available_features=1&include_entities=1&max_position=%s"
    #
    # # url = "https://twitter.com/i/search/timeline?f=tweets"
    #
    # url_get_data = " " + tweet_criteria["query"]
    #
    # if tweet_criteria["near"] is not None:
    #     url_get_data += "&near:" + tweet_criteria["near"]
    #
    # if tweet_criteria["within"] is not None:
    #     url_get_data += " within:" + tweet_criteria["within"] + "mi"
    #
    # if tweet_criteria["since"] is not None:
    #     url_get_data += " since:" + tweet_criteria["since"]
    #
    # if tweet_criteria["until"] is not None:
    #     url_get_data += " until:" + tweet_criteria["until"]
    #
    # # url_get_data += "&src=typd&max_position=" + refresh_cursor
    #
    # # if tweet_criteria["top_tweets"]:
    # #     url = 'https://twitter.com/i/search/timeline?f=realtime&q=%s&src=typd&%smax_position=%s'
    # print(url_get_data)

    # url = url + urllib.request.quote(url_get_data)
    # url = url % (urllib.request.quote(url_get_data), urllib.request.quote(refresh_cursor))
    print('URL={0}'.format(url))
    # headers = [
    #     ('Host', "twitter.com"),
    #     ('User-Agent', "Mozilla/5.0 (Windows NT 6.1; Win64; x64)"),
    #     ('Accept', "application/json, text/javascript, */*; q=0.01"),
    #     ('Accept-Language', "de,en-US;q=0.7,en;q=0.3"),
    #     ('X-Requested-With', "XMLHttpRequest"),
    #     ('Referer', url),
    #     ('Connection', "keep-alive")
    # ]

    headers = [
        ('Host', "twitter.com"),
        ('User-Agent',
         " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.1 Safari/605.1.15"),
        ('Accept', "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
        ('Accept-Language', "en-us"),
        ('Connection', "keep-alive")
    ]

    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cookie_jar))
    opener.addheaders = headers

    try:
        response = opener.open(url)
        json_response = response.read()
    except:
        print(
                "Twitter weird response. Try to see on browser: https://twitter.com/search?q=%s&src=typd" % urllib2.quote(
                url_get_data))
        print("Unexpected error:", sys.exc_info()[0])
        sys.exit()

    return lib_json.loads(json_response)
