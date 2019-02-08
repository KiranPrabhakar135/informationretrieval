package Implementations;

import Interfaces.ICommonFunctionality;
import Interfaces.IIOOperation;
import Interfaces.IPostingsList;
import models.BooleanOperationResult;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

public class IOOperation implements IIOOperation {

    private ICommonFunctionality commonFunctionality = new CommonFunctionality();
    @Override
    public void writeTermsAndPostingsToOutputFile(String outputFile, TreeMap<String, IPostingsList> termsDetails, List<String> queryTerms) throws IOException {
        String getPostings = "GetPostings";
        for (String term: queryTerms) {
            IPostingsList postings =  termsDetails.get(term);
            if(postings != null){
                List<Integer> docIds = postings.getAllDocIds();
                String commaSeparatedDocIds = "Postings list:" +
                        commonFunctionality.convertDocIdsToCommaSeparatedString(docIds);
                writeLinesToFile(outputFile, getPostings, term, commaSeparatedDocIds);
            }
        }
    }

    @Override
    public void writeTAATANDResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException {
        FormatOutputAndWriteToFile(outputFile, query, result.getPostingsList(), result.getNumberOfDocuments(), result.getNumberOfComparisons(), "TaatAnd");
    }

    @Override
    public void writeTAATORResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException {
        FormatOutputAndWriteToFile(outputFile, query, result.getPostingsList(), result.getNumberOfDocuments(), result.getNumberOfComparisons(), "TaatOr");
    }

    @Override
    public void writeDAATANDResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException {
        FormatOutputAndWriteToFile(outputFile, query, result.getPostingsList(), result.getNumberOfDocuments(), result.getNumberOfComparisons(), "DaatAnd");
    }

    @Override
    public void writeDAATORResultToOutputFile(String outputFile, String query, BooleanOperationResult result) throws IOException {
        FormatOutputAndWriteToFile(outputFile, query, result.getPostingsList(), result.getNumberOfDocuments(), result.getNumberOfComparisons(), "DaatOr");
    }

    @Override
    public boolean checkIfFileExists(String filePath) {
        File file = new File(filePath);
        return file.exists();
    }

    @Override
    public void createFileIfNotPresent(String filePath) throws IOException {
        File file = new File(filePath);
        if(checkIfFileExists(filePath)){
            file.delete();
        }
        file.createNewFile();
    }

    public void writeLinesToFile(String filePath, String ... content) throws IOException{
        File file = new File(filePath);
        FileWriter fileWriter = new FileWriter(file, true);
        BufferedWriter writer = new BufferedWriter(fileWriter);
        for (String line: content) {
            writer.write(line);
            writer.newLine();
        }
        writer.close();
    }

    @Override
    public List<String> getQueryTermsFromInputFile(String inputFilePath) throws IOException {
        List<String> queries = new ArrayList<>();
        File file = new File(inputFilePath);
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String line;
        while ((line = reader.readLine()) != null){
            queries.add(line);
        }
        return queries;
    }

    private void FormatOutputAndWriteToFile(String outputFile, String query, IPostingsList postingsList, int docCount, int comparisons,
                              String operationType) throws IOException {
        List<Integer> docIds = postingsList.getAllDocIds();
        String result = commonFunctionality.convertDocIdsToCommaSeparatedString(docIds);
        if(result.isEmpty()){
            result = "Results: empty";
        }
        else{
            result = "Results:" + result;
        }
        String noOfDocs = "Number of documents in results: " + docCount;
        String noOfComparisons = "Number of comparisons: " + comparisons;
        writeLinesToFile(outputFile, operationType, query, result, noOfDocs, noOfComparisons);
    }

}
