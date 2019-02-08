package Interfaces;
import java.util.List;
import java.util.TreeMap;

public interface ILuceneFunctionality {
    TreeMap<String, IPostingsList> getInvertedIndex(String indexFilePath) throws Exception;
    List<Integer> getAllDocumentIds(String indexFilePath) throws Exception;
}
