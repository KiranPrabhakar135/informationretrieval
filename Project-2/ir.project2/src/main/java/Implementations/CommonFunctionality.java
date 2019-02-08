package Implementations;
import Interfaces.*;
import java.util.*;

public class CommonFunctionality implements ICommonFunctionality {

    @Override
    public List<String> getTermsFromQuery(String query) {
        String[] queryArray =  query.split(" ");
        List<String> queryTerms = new ArrayList();
        for (int i = 0; i< queryArray.length; i++){
            queryTerms.add(queryArray[i]);
        }
        return queryTerms;
    }

    @Override
    public String convertDocIdsToCommaSeparatedString(List<Integer> list) {
        StringBuilder builder = new StringBuilder();
        for (int string: list) {
            builder.append(" ");
            builder.append(string);
        }

        return builder.toString();
    }
}
