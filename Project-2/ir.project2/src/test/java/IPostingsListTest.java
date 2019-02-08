import Implementations.PostingsList;
import Interfaces.IPostingsList;
import models.Posting;

public class IPostingsListTest {
    public static void main(String[] args) {
        IPostingsList postingsList = new PostingsList();
        for(int i=1; i<=10; i++){
            Posting posting = new Posting(i);
            postingsList.insertAtEnd(posting);
        }
        while (postingsList.hasNext()){
            System.out.println(postingsList.getNext(false).getValue());
        }
        postingsList.updateSkipPointers();

        while (postingsList.hasNext()){
            System.out.println(postingsList.getNext(true).getValue());
        }


    }
}
