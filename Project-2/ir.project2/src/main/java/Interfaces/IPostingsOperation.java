package Interfaces;

import java.util.List;
import java.util.TreeMap;
import models.*;

public interface IPostingsOperation {
    BooleanOperationResult intersectPosting(List<IPostingsList> postings);
    BooleanOperationResult intersectPostings(IPostingsList postingsList1, IPostingsList postingsList2);
    BooleanOperationResult unionPostings(List<IPostingsList> postings);
    BooleanOperationResult unionPostings(IPostingsList postingsList1, IPostingsList postingsList2);
    BooleanOperationResult intersectPostingsForDAATAndOperation(List<IPostingsList> postings);
    BooleanOperationResult intersectPostingsWithAllDocIds(List<Integer> allDocIds, List<IPostingsList> postingsLists);
    BooleanOperationResult unionPostingsWithAllDocIds(List<Integer> allDocIds, List<IPostingsList> postingsLists);
    BooleanOperationResult unionPostingsForDAATOrOperation(List<IPostingsList> postings);
    List<IPostingsList> sortPostingsOnCount(List<IPostingsList> postings);
    List<IPostingsList> getPostingsList(TreeMap<String, IPostingsList> dictionary, List<String> terms);
    TreeMap<String, IPostingsList> getPostingsDictionaryForQueryTerms(TreeMap<String, IPostingsList> dictionary, List<String> terms);
}
