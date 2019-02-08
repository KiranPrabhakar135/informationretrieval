package Interfaces;

import Implementations.PostingsList;
import models.Posting;

import java.util.List;

public interface IPostingsList {
    void insertAtEnd(int docId);
    void insertAtEnd(Posting posting);
    Posting getNext(Boolean skipRequired);
    Posting getIterator();
    Boolean hasNext();
    void updateSkipPointers();
    void resetIterator();
    int getCount();
    int peekNextSkipValue();
    int peekNextValue();
    List<Integer> getAllDocIds();
    Posting getHead();
    int peekCurrentValue();
    IPostingsList sortPostings();
}