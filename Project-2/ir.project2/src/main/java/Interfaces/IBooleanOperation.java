package Interfaces;
import java.io.IOException;
import java.util.List;
import java.util.TreeMap;

public interface IBooleanOperation {
    void performTAATAndOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException;
    void performTAATOrOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException;
    void performDAATAndOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException;
    void performDAATOrOperation(TreeMap<String, IPostingsList> dictionary, String query, String outputFilePath) throws IOException;
}
