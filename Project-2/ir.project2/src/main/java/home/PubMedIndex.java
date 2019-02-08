package home;

import java.io.*;
import java.util.*;
import Implementations.*;
import Interfaces.*;

public class PubMedIndex {
    public static IBooleanOperation booleanOperation = new BooleanOperation();
    public static IIOOperation ioOperation = new IOOperation();
    public static ILuceneFunctionality luceneFunctionality = new LuceneFunctionality();
    public static IPostingsOperation postingsOperation = new PostingsOperation();
    public static ICommonFunctionality commonFunctionality = new CommonFunctionality();

    public static void main(String args[]) throws IOException {
        if(args.length != 3){
            System.out.println("Check the command.");
            return;
        }
       /* String invertedIndexFilePath = "C:\\IR\\Project-2\\index";//
        String outputFile = "C:\\IR\\Project-2\\ir.project2\\output.txt";// // "output.txt"
        String inputFile = "C:\\IR\\Project-2\\ir.project2\\input22.txt";// // "input.txt"*/

        String invertedIndexFilePath = args[0];// "C:\\IR\\Project-2\\index";//
        String outputFile = args[1]; // "output.txt";//// "output.txt"
        String inputFile = args[2]; //"input.txt";// // "input.txt"

        ioOperation.createFileIfNotPresent(outputFile);
        try {
            TreeMap<String, IPostingsList> dictionary = luceneFunctionality.getInvertedIndex(invertedIndexFilePath);
            List<String> queryTerms = ioOperation.getQueryTermsFromInputFile(inputFile);

            for (String query: queryTerms) {
                TreeMap<String, IPostingsList> queryDictionary =
                        postingsOperation.getPostingsDictionaryForQueryTerms(dictionary, commonFunctionality.getTermsFromQuery(query));

                ioOperation.writeTermsAndPostingsToOutputFile(outputFile, dictionary, commonFunctionality.getTermsFromQuery(query));
                booleanOperation.performTAATAndOperation(dictionary, query, outputFile);
                booleanOperation.performTAATOrOperation(dictionary, query, outputFile);
                booleanOperation.performDAATAndOperation(dictionary, query, outputFile);
                booleanOperation.performDAATOrOperation(dictionary, query, outputFile);
            }

        } catch (IOException e) {
            System.out.println("Caught IO Exception!");
            e.printStackTrace();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
