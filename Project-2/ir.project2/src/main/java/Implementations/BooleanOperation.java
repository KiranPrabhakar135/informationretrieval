package Implementations;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;
import Interfaces.*;
import Implementations.*;
import models.BooleanOperationResult;
import models.Posting;

public class BooleanOperation implements IBooleanOperation {
    ICommonFunctionality commonFunctionality = new CommonFunctionality();
    IPostingsOperation postingsOperation = new PostingsOperation();
    IIOOperation ioOperation = new IOOperation();

    @Override
    public void performTAATAndOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException {
        List<IPostingsList> postings = getPostingsListForQuery(dictionary, query);
        BooleanOperationResult intersectResult = new BooleanOperationResult();
        if(postings.size() == 1){
            intersectResult.setPostingsList(postings.get(0));
        }

        intersectResult = postingsOperation.intersectPosting(postings);
        ioOperation.writeTAATANDResultToOutputFile(outputFilePath, query, intersectResult );
    }

    @Override
    public void performTAATOrOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException {
        List<IPostingsList> postings = getPostingsListForQuery(dictionary, query);
        BooleanOperationResult unionResult = postingsOperation.unionPostings(postings);
        ioOperation.writeTAATORResultToOutputFile(outputFilePath, query, unionResult );
    }

    @Override
    public void performDAATAndOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException {
        List<IPostingsList> postings = getPostingsListForQuery(dictionary, query);
        BooleanOperationResult intersectResult = postingsOperation.intersectPostingsForDAATAndOperation(postings);
        ioOperation.writeDAATANDResultToOutputFile(outputFilePath, query, intersectResult );
    }

    @Override
    public void performDAATOrOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException {
        List<IPostingsList> postings = getPostingsListForQuery(dictionary, query);
        BooleanOperationResult unionResult = postingsOperation.unionPostingsForDAATOrOperation(postings);
        ioOperation.writeDAATORResultToOutputFile(outputFilePath, query, unionResult);
    }

    private List<IPostingsList> getPostingsListForQuery(TreeMap<String, IPostingsList> dictionary, String query) {
        List<String> terms = commonFunctionality.getTermsFromQuery(query);
        return postingsOperation.getPostingsList(dictionary, terms);
    }
}
