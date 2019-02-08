package Interfaces;
import java.io.IOException;
import java.util.List;
import java.util.TreeMap;

public interface ICommonFunctionality {
    List<String> getTermsFromQuery(String query);
    String convertDocIdsToCommaSeparatedString(List<Integer> list);
}
