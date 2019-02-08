package Implementations;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeMap;
import Interfaces.*;
import models.*;

public class PostingsOperation implements IPostingsOperation {

    public BooleanOperationResult intersectPosting(List<IPostingsList> postings) {
        if(postings.size() == 0){
            return new BooleanOperationResult();
        }
        if(postings.size() == 1){
            return new BooleanOperationResult(postings.get(0), postings.get(0).getCount(),0);
        }
        postings = this.sortPostingsOnCount(postings);
        IPostingsList partialPostingList = postings.get(0);
        BooleanOperationResult result = new BooleanOperationResult();
        ResetIteratorForAllPostings(postings);
        UpdateSkipPointersForAllPostings(postings);
        int comparisonsCount = 0;
        for(int i=1; i< postings.size(); i++){
            IPostingsList nextPosting = postings.get(i);
            if(partialPostingList.getCount() < nextPosting.getCount()){
                result = intersectPostings(partialPostingList, nextPosting);
            }
            else{
                result = intersectPostings(nextPosting,partialPostingList);
            }
            partialPostingList = result.getPostingsList();
            comparisonsCount += result.getNumberOfComparisons();
        }
        result.setNumberOfComparisons(comparisonsCount);
        return result;
    }

    public BooleanOperationResult intersectPostings(IPostingsList postingsList1, IPostingsList postingsList2) {
        int comparisonsCount = 0;
        IPostingsList resultList = new PostingsList();
        BooleanOperationResult result = new BooleanOperationResult();
        if(postingsList1.getCount() == 0 && postingsList2.getCount() == 0){
            return result;
        }

        Posting node1 = postingsList1.getHead();
        Posting node2 = postingsList2.getHead();
        while (postingsList1.hasNext() && postingsList2.hasNext()){
            int node1Value = node1.getValue();
            int node2Value = node2.getValue();
            comparisonsCount++;
            if( node1Value == node2Value){
                Posting temp = new Posting(node1.getValue());
                resultList.insertAtEnd(temp);
                node1 = postingsList1.getNext(false);
                node2 = postingsList2.getNext(false);
            }
            if(node1Value < node2Value)            {
                int nextSkipValue = postingsList1.peekNextSkipValue();
                comparisonsCount++;
                if(nextSkipValue == -1 || node2Value < nextSkipValue){
                    node1 = postingsList1.getNext(false);
                }
                else {
                    node1 = postingsList1.getNext(true);
                }
            }
            if(node1Value > node2Value)
            {
                int nextSkipValue = postingsList2.peekNextSkipValue();
                comparisonsCount++;
                if(nextSkipValue == -1 || node1Value < nextSkipValue){
                    node2 = postingsList2.getNext(false);
                }
                else {
                    node2 = postingsList2.getNext(true);
                }
            }

        }
        resultList.updateSkipPointers();
        return new BooleanOperationResult(resultList, resultList.getCount(),comparisonsCount);
    }

    public BooleanOperationResult unionPostings(List<IPostingsList> postings) {
        ResetIteratorForAllPostings(postings);
        IPostingsList tempPostingList = postings.get(0);
        if(postings.size() == 1){
            return new BooleanOperationResult(tempPostingList, tempPostingList.getCount(), 0);
        }
        BooleanOperationResult result = new BooleanOperationResult();
        int comparisonsCount = 0;
        for(int i=1; i< postings.size(); i++){
            IPostingsList nextPosting = postings.get(i);
            result = unionPostings(tempPostingList, nextPosting);
            tempPostingList = result.getPostingsList();
            tempPostingList.resetIterator();
            comparisonsCount += tempPostingList.getCount();
        }
        result.setNumberOfComparisons(comparisonsCount);
        return result;
    }

    private void ResetIteratorForAllPostings(List<IPostingsList> postings) {
        for (IPostingsList posting : postings) {
            posting.resetIterator();
        }
    }

    private void UpdateSkipPointersForAllPostings(List<IPostingsList> postings) {
        for (IPostingsList posting : postings) {
            posting.updateSkipPointers();
        }
    }

    public BooleanOperationResult unionPostings(IPostingsList postingsList1, IPostingsList postingsList2) {
        IPostingsList postings = new PostingsList();
        int comparisonsCount = 0;
        BooleanOperationResult result = new BooleanOperationResult();
        if(postingsList1.getCount() == 0 && postingsList2.getCount() == 0){
            return result;
        }
        if(postingsList1.getCount() == 0){
            return  new BooleanOperationResult(postingsList2, postingsList2.getCount(),0);
        }
        if(postingsList2.getCount() == 0){
            return  new BooleanOperationResult(postingsList1, postingsList1.getCount(),0);
        }
        Posting node1 = postingsList1.getHead();
        Posting node2 = postingsList2.getHead();
        while (postingsList1.hasNext() && postingsList2.hasNext()){
            Posting temp = null;
            int node1Value = node1.getValue();
            int node2Value = node2.getValue();
            if(node1Value == node2Value){
                temp = new Posting(node1.getValue());
                node1 = postingsList1.getNext(false);
                node2 = postingsList2.getNext(false);
            }
            if(node1Value < node2Value){
                temp = new Posting(node1.getValue());
                node1 = postingsList1.getNext(false);
            }
            if(node1Value > node2Value)
            {
                temp = new Posting(node2.getValue());
                node2 = postingsList2.getNext(false);
            }
            postings.insertAtEnd(temp);
            comparisonsCount++;
        }
        if(node1 != null){
            InsertTheRemainingPostings(postingsList1, postings);
        }
        else {
            InsertTheRemainingPostings(postingsList2, postings);
        }
        return new BooleanOperationResult(postings, postings.getCount(), comparisonsCount);
    }

    private void InsertTheRemainingPostings(IPostingsList postingsList2, IPostingsList postings) {
        Posting posting = postingsList2.getIterator();
        postings.insertAtEnd(posting);
        posting = postingsList2.getNext(false);
        while (postingsList2.hasNext()){
            postings.insertAtEnd(posting);
            posting = postingsList2.getNext(false);
        }
    }

    public  BooleanOperationResult intersectPostingsForDAATAndOperation(List<IPostingsList> postings) {
        postings = this.sortPostingsOnCount(postings);
        ResetIteratorForAllPostings(postings);
        UpdateSkipPointersForAllPostings(postings);
        int postingsCount = postings.size();
        IPostingsList firstPostings = postings.get(0);
        if(postingsCount == 1){
            return new BooleanOperationResult(firstPostings,firstPostings.getCount(),0);
        }
        int docId = firstPostings.getHead().getValue();
        int i = 1, count = 1, comparisonsCount = 0;
        boolean incrementFirstPosting = false;
        IPostingsList resultPostings = new PostingsList();
        while (i < postingsCount && postings.get(i).hasNext()){
            IPostingsList currentPosting = postings.get(i);
            int currentDocId = currentPosting.peekCurrentValue();
            if(currentDocId == -1){
                i++;
                continue;
            }
            comparisonsCount++;
            if(currentDocId == docId){
                count++;
                currentPosting.getNext(false);
                if(i+1 < postingsCount){
                    i++;
                }

                if(count == postingsCount){
                    resultPostings.insertAtEnd(docId);
                    count = 1;
                    incrementFirstPosting = true;
                }
            }
            if(currentDocId < docId){
                int nextSkipValue = currentPosting.peekNextSkipValue();
                if(nextSkipValue != -1 && nextSkipValue < docId){
                    currentPosting.getNext(true);
                }
                else{
                    currentPosting.getNext(false);
                }
            }
            if(currentDocId > docId){
                incrementFirstPosting = true;
            }
            if(incrementFirstPosting){
                Posting nextInFirstPosting = firstPostings.getNext(false);
                if(nextInFirstPosting != null){
                    incrementFirstPosting = false;
                    docId = nextInFirstPosting.getValue();
                    i = 1;
                }
                else {
                    break;
                }
            }
        }
        resultPostings.updateSkipPointers();
        return new BooleanOperationResult(resultPostings,resultPostings.getCount(),comparisonsCount);
    }

    public BooleanOperationResult unionPostingsForDAATOrOperation(List<IPostingsList> postings){
        postings = this.sortPostingsOnCount(postings);
        int postingsCount = postings.size();
        if(postingsCount == 1){
            return  new BooleanOperationResult(postings.get(0),postings.get(0).getCount(),0);
        }
        ResetIteratorForAllPostings(postings);
        IPostingsList resultList = new PostingsList();
        int comparisonsCount = 0;
        int previousDocId = 0;
        while (true){
            int docId = 0;
            boolean allPostingsProcessed = false;
            int smallestDocIdPosting = 0;
            int finishedPosting = 0;
            for (IPostingsList posting: postings) {
                int currentValue = posting.peekCurrentValue();
                if(currentValue != -1){
                    docId = currentValue;
                    break;
                }
                finishedPosting ++;
                if(finishedPosting == postingsCount){
                    allPostingsProcessed = true;
                }
            }
            if(allPostingsProcessed){
                break;
            }
            for (IPostingsList posting: postings) {
                int currentDocId = posting.peekCurrentValue();
                comparisonsCount++;
                if(currentDocId != -1 && currentDocId <= docId){
                    docId = currentDocId;
                    smallestDocIdPosting = postings.indexOf(posting);
                }
            }
            postings.get(smallestDocIdPosting).getNext(false);
            if(docId != previousDocId){
                resultList.insertAtEnd(docId);
            }
            previousDocId = docId;
        }
        return new BooleanOperationResult(resultList,resultList.getCount(),comparisonsCount);
    }

    @Override
    public BooleanOperationResult intersectPostingsWithAllDocIds(List<Integer> allDocIds, List<IPostingsList> postingsLists) {
        postingsLists = this.sortPostingsOnCount(postingsLists);
        ResetIteratorForAllPostings(postingsLists);
        IPostingsList resultList = new PostingsList();
        int numberOfComparisons = 0;
        for (int docId: allDocIds) {
            int countOfPostingsWithCurrentDocId = 0;
            for (IPostingsList postings : postingsLists) {
                Posting node = postings.getIterator();
                while (postings.hasNext()){
                    numberOfComparisons++;
                    int nextSkipValue = postings.peekNextSkipValue();
                    if(nextSkipValue != -1 && nextSkipValue <= docId){
                        node = postings.getNext(true);
                        continue;
                    }
                    if(node.getValue() < docId){
                        node = postings.getNext(false);
                        continue;
                    }
                    if(node.getValue() == docId){
                        countOfPostingsWithCurrentDocId++;
                        break;
                    }
                    if(node.getValue() > docId){
                        break;
                    }
                }
            }
            if(countOfPostingsWithCurrentDocId == postingsLists.size()){
                Posting temp = new Posting(docId);
                resultList.insertAtEnd(temp);
            }
        }
        return new BooleanOperationResult(resultList, resultList.getCount(), numberOfComparisons);
    }

    @Override
    public BooleanOperationResult unionPostingsWithAllDocIds(List<Integer> allDocIds, List<IPostingsList> postingsLists) {
        int comparisonsCount = 0;
        ResetIteratorForAllPostings(postingsLists);
        IPostingsList resultList = new PostingsList();
        for (int docId: allDocIds) {
            boolean isPresent = false;
            for (IPostingsList posting : postingsLists) {
                if(posting.getCount() == 0){
                    continue;
                }
                Posting node = posting.getIterator();
                while (posting.hasNext()){
                    int nodeValue = node.getValue();
                    comparisonsCount++;
                    if(nodeValue > docId){
                        break;
                    }
                    if(nodeValue < docId){
                        node = posting.getNext(false);
                        continue;
                    }
                    if(nodeValue == docId){
                        resultList.insertAtEnd(new Posting(nodeValue));
                        isPresent = true;
                        break;
                    }
                }
                if(isPresent){
                    break;
                }
            }
        }
        return new BooleanOperationResult(resultList, resultList.getCount(),comparisonsCount);
    }

    public List<IPostingsList> sortPostingsOnCount(List<IPostingsList> postings){
        if(postings.size() >= 2){
            postings.sort(new Comparator<IPostingsList>() {
                public int compare(IPostingsList o1, IPostingsList o2) {
                    return o1.getCount() - o2.getCount();
                }
            });
        }
        return postings;
    }

    public List<IPostingsList> getPostingsList(TreeMap<String, IPostingsList> dictionary, List<String> terms) {
        List<IPostingsList> postings = new ArrayList();
        for (String term : terms) {
            IPostingsList posting = dictionary.get(term);
            postings.add(posting);
        }
        return postings;
    }
    public TreeMap<String, IPostingsList> getPostingsDictionaryForQueryTerms(TreeMap<String, IPostingsList> dictionary, List<String> terms) {
        TreeMap<String, IPostingsList> result = new TreeMap();
        for (String term : terms) {
            result.putIfAbsent(term,dictionary.get(term));
        }
        return result;
    }
}
