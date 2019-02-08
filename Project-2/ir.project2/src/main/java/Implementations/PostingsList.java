package Implementations;
import Interfaces.IPostingsList;
import models.Posting;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class PostingsList implements IPostingsList {
    private Posting head;
    private Posting tail;
    private Posting iterator;
    private int count;

    public void insertAtEnd(int docId){
        Posting posting = new Posting(docId);
        insertAtEnd(posting);
    }
    @Override
    public void insertAtEnd(Posting posting) {
        if(head == null){
            head = posting;
            tail = posting;
            iterator = head;
        }
        else{
            tail.setNext(posting);
            tail = posting;
        }
        count++;
    }
    public void resetIterator(){
        iterator = head;
    }

    public int peekNextSkipValue(){
        if(iterator != null && iterator.getSkipTo() != null){
            return  iterator.getSkipTo().getValue();
        }
        return -1;
    }
    public int peekNextValue(){
        if(iterator != null ){
            return  iterator.getNext().getValue();
        }
        return -1;
    }
    public int peekCurrentValue(){
        if(iterator != null){
            return iterator.getValue();
        }
        return -1;
    }

    @Override
    public List<Integer> getAllDocIds() {
        List<Integer> docIds = new ArrayList<>();
        while (hasNext()){
            docIds.add(iterator.getValue());
            getNext(false);
        }
        return docIds;
    }

    @Override
    public Posting getHead() {
        return head;
    }

    @Override
    public Posting getNext(Boolean skipRequired) {
        if(skipRequired){
            if(iterator != null && iterator.getSkipTo() != null){
                iterator = iterator.getSkipTo();
                return iterator;
            }
        }
        if(iterator != null){
            iterator = iterator.getNext();
        }
        return iterator;
    }

    @Override
    public Posting getIterator() {
        return iterator;
    }

    @Override
    public Boolean hasNext() {
        return iterator != null;
    }

    @Override
    public void updateSkipPointers() {
        if(count > 0){
            double skipCount = Math.floor(Math.sqrt(count));
            int i = 1;
            double j =skipCount;
            resetIterator();
            Posting initial = getHead();
            while (hasNext()){
                Posting next = getNext(false);
                j--;
                if(j == 0){
                    initial.setSkipTo(next);
                    initial = next;
                    j = skipCount;
                }
                i++;
            }
            resetIterator();
        }
    }

    public IPostingsList sortPostings(){
        List<Integer> allDocIds = getAllDocIds();
        Collections.sort(allDocIds);
        /*allDocIds.sort(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return 01-02;
            }
        });*/
        IPostingsList list = new PostingsList();
        for (int docId: allDocIds) {
            list.insertAtEnd(docId);
        }
        return list;
    }

    @Override
    public int getCount() {
        return count;
    }
}