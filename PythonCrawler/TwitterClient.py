import http.cookiejar
import json as lib_json
import sys
import urllib.parse
import urllib.request


def getJsonReponse(tweet_criteria, refresh_cursor):
    cookie_jar = http.cookiejar.CookieJar()
    url = "https://twitter.com/i/search/timeline?f=tweets&q=%s&src=typd&qf=on&%smax_position=%s"

    url_get_data = ''

    # if tweet_criteria["near"] is not None:
    #     url_get_data += "&near:" + tweet_criteria["near"] + " within:" + tweet_criteria["within"]

    if tweet_criteria["since"] is not None:
        url_get_data += ' since:' + tweet_criteria["since"]

    if tweet_criteria["until"] is not None:
        url_get_data += ' until:' + tweet_criteria["until"]

    url_get_data += ' ' + tweet_criteria["query"]

    if tweet_criteria["language"] is not None:
        urlLang = 'l=' + tweet_criteria["language"] + '&'
    else:
        urlLang = ''

    url = url % (urllib.request.quote(url_get_data), urlLang, refresh_cursor)

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
    headers = [
        ('Host', "twitter.com"),
        ('User-Agent', "Mozilla/5.0 (Windows NT 6.1; Win64; x64)"),
        ('Accept', "application/json, text/javascript, */*; q=0.01"),
        ('Accept-Language', "de,en-US;q=0.7,en;q=0.3"),
        ('X-Requested-With', "XMLHttpRequest"),
        ('Referer', url),
        ('Connection', "keep-alive")
    ]

    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie_jar))
    opener.addheaders = headers

    try:
        response = opener.open(url)
        json_response = response.read()
    except:
        print(
            "Twitter weird response. Try to see on browser: https://twitter.com/search?q=%s&src=typd" % urllib.parse.quote(
                url_get_data))
        print("Unexpected error:", sys.exc_info()[0])
        sys.exit()

    return lib_json.loads(json_response)
