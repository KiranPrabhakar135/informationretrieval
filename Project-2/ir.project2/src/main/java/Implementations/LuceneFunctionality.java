package Implementations;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;
import Interfaces.*;
import models.*;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.*;
import org.apache.lucene.search.DocIdSetIterator;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.BytesRef;

public class LuceneFunctionality implements ILuceneFunctionality {

    public TreeMap<String, IPostingsList> getInvertedIndex(String indexFilePath) throws Exception {
        File file = new File(indexFilePath);
        Directory directory = FSDirectory.open(file.toPath());
        IndexReader reader = DirectoryReader.open(directory);
        return getInvertedIndex(reader);
    }

    @Override
    public List<Integer> getAllDocumentIds(String indexFilePath) throws Exception {
        File file = new File(indexFilePath);
        Directory directory = FSDirectory.open(file.toPath());
        IndexReader reader = DirectoryReader.open(directory);
        List<Integer> docIds = new ArrayList();
        for(int i = 0; i< reader.maxDoc(); i++){
            Document document= reader.document(i);
            if(document != null){
                docIds.add(Integer.parseInt(document.get("id")));
            }
        }
        return docIds;
    }

    private static TreeMap<String, IPostingsList> getInvertedIndex(IndexReader reader) throws Exception {
        Fields fields = MultiFields.getFields(reader);
        Iterator<String> fieldsIterator = fields.iterator();
        TreeMap<String, IPostingsList> dictionary = new TreeMap();

        while (fieldsIterator.hasNext()){
            String field = fieldsIterator.next();
            if(!field.equals("id")){
                Terms terms = MultiFields.getTerms(reader,field);
                TermsEnum termIterator = terms.iterator();
                while(termIterator.next() != null){
                    BytesRef term =  termIterator.term();
                    PostingsEnum postings = termIterator.postings(null);
                    IPostingsList postingsList = new PostingsList();
                    while (postings.nextDoc() != DocIdSetIterator.NO_MORE_DOCS){
                        int docId = postings.docID();
                        Posting posting = new Posting(docId);
                        postingsList.insertAtEnd(posting);
                    }
                    if(postingsList.getCount() > 1){
                        int a = 0;
                        a++;
                    }
                    String termString = term.utf8ToString();
                    if(!termString.isEmpty()){
                        IPostingsList list = dictionary.get(termString);
                        if(list!= null){
                           while (postingsList.hasNext()){
                               list.insertAtEnd(postingsList.peekCurrentValue());
                               postingsList.getNext(false);
                            }
                            IPostingsList sortedPostings = list.sortPostings();
                            sortedPostings.updateSkipPointers();
                            dictionary.put(termString,sortedPostings);
                        }
                        else{
                            IPostingsList sortedPostings = postingsList.sortPostings();
                            sortedPostings.updateSkipPointers();
                            dictionary.put(termString,sortedPostings);
                        }
                    }
                }
            }
        }
        return dictionary;
    }
}
