package Interfaces;

import models.BooleanOperationResult;

import java.io.IOException;
import java.util.List;
import java.util.TreeMap;

public interface IIOOperation {
    void writeTermsAndPostingsToOutputFile(String outputFile, TreeMap<String, IPostingsList> termsDetails, List<String> queryTerms) throws IOException;
    void writeTAATANDResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException;
    void writeTAATORResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException;
    void writeDAATANDResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException;
    void writeDAATORResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException;
    boolean checkIfFileExists(String filePath);
    void createFileIfNotPresent(String filePath) throws IOException;
    void writeLinesToFile(String filePath, String ... content) throws IOException;
    List<String> getQueryTermsFromInputFile(String inputFilePath) throws IOException;
}
