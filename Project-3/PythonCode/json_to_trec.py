# -*- coding: utf-8 -*-
import json
import urllib
from urllib.request import urlopen, Request
import os as os
from sys import argv


def create_trec_file(corename, query_id, query, output_file):
    # change the url according to your own corename and query hl=on&hl.fl=text_*&mlt.fl=text_*&
    # pf=text_en^10%20text_de^10%20text_ru^10&defType=maxscore fl=text_en,text_de,text_ru,tweet_urls,tweet_hashtags&pf=text_en,text_de,text_ru
    inurl = 'http://localhost:8983/solr/'+corename+'/select?defType=edismax&q=' + query + '&fl=id%2Cscore&wt=json&indent=true&rows=20'
    outfn = output_file
    request = Request(inurl)
    print(inurl)
    # change query id and IRModel name accordingly
    qid = query_id
    IRModel=corename
    outf = open(outfn, 'a+')
    data = urlopen(request)
    # if you're using python 3, you should use
    # data = urllib.request.urlopen(inurl)
    
    docs = json.load(data)['response']['docs']
    # the ranking should start from 1 and increase
    rank = 1
    for doc in docs:
        outf.write(qid + ' ' + 'Q0' + ' ' + str(doc['id']) + ' ' + str(rank) + ' ' + str(doc['score']) + ' ' + IRModel + '\n')
        rank += 1
    outf.close()


def create_trec_file1(corename, query_id, query, output_file):
    outf = open(output_file, 'a+')
    #defType=edismax&qf=text_en^2%20text_ru^2%20text_de^2&qs=10&pf=text_en^2%20text_ru^2%20text_de^2&ps=10&pf2=text_en^10%20text_ru^10%20text_de^10&pf3=text_en^10%20text_ru^10%20text_de^10&ps2=5&ps3=15&
    inurl = 'http://localhost:8984/solr/' + corename + '/select?q=' + query + '&fl=id%2Cscore&wt=json&indent=true&rows=20'
    print(inurl)
    data = urllib.request.urlopen(inurl)

    docs = json.load(data)['response']['docs']
    # the ranking should start from 1 and increase
    rank = 1
    for doc in docs:
        outf.write(
            query_id + ' ' + 'Q0' + ' ' + str(doc['id']) + ' ' + str(rank) + ' ' + str(doc['score']) + ' ' + corename + '\n')
        rank += 1
    outf.close()


def construct_query_dictionary(input_file_path):
    with open(input_file_path, encoding="utf8") as file:
        queries = file.readlines()
    dictionary = {content.split()[0]:content[content.index(" ") + 1:].strip("\n").replace(":","\:") for content in queries}
    return dictionary


def get_scores(model, dictionary, output_file_path):
    if os.path.isfile(output_file_path):
        os.remove(output_file_path)
    for key in dictionary.keys():
        create_trec_file1(model, key, urllib.request.quote(dictionary.get(key)),output_file_path)
        #create_trec_file(model, key, url_parse.urlencode({'uri':dictionary.get(key)}), output_file_path)


if(len(argv) == 2):
    a = argv[1]


def main(timestamp):
    queries_dict = construct_query_dictionary('queries.txt')
    get_scores('VSM', queries_dict, 'C:\IR\Project-3\TrecEvaluation\\VSM_output' + timestamp + '.txt')
    get_scores('BM25', queries_dict, 'C:\IR\Project-3\TrecEvaluation\\BM25_output' + timestamp + '.txt')
    get_scores('DFR', queries_dict, 'C:\IR\Project-3\TrecEvaluation\\DFR_output' + timestamp + '.txt')


time_stamp = argv[1]
main(time_stamp)