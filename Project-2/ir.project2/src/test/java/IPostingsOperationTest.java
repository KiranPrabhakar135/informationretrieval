import Implementations.PostingsList;
import Implementations.PostingsOperation;
import Interfaces.IPostingsList;
import Interfaces.IPostingsOperation;
import models.BooleanOperationResult;
import models.Posting;

import java.util.ArrayList;
import java.util.List;

public class IPostingsOperationTest {

    public static void main(String[] args) {
        IPostingsOperation operations = new PostingsOperation();
        IPostingsList postingsList1 = new PostingsList();
        for(int i=1; i<=20; i++){
            Posting posting = new Posting(i);
            postingsList1.insertAtEnd(posting);
        }
        IPostingsList postingsList2 = new PostingsList();
        for(int i=1; i<=10; i++){
            Posting posting = new Posting(i*4);
            postingsList2.insertAtEnd(posting);
        }
        IPostingsList postingsList3 = new PostingsList();
        for(int i=1; i<=10; i++){
            Posting posting = new Posting(i*3);
            postingsList3.insertAtEnd(posting);
        }

        List<IPostingsList> postings = new ArrayList<>();
        postings.add(postingsList1);
        postings.add(postingsList2);
        postings.add(postingsList3);
        BooleanOperationResult result = operations.unionPostings(postings);
        System.out.println(result.getNumberOfComparisons());
        System.out.println(result.getPostingsList().getCount());
        System.out.println(result.getPostingsList().getAllDocIds());

    }
}
