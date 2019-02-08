package models;

import Interfaces.*;

public class BooleanOperationResult {
    private IPostingsList postingsList;
    private int numberOfDocuments;
    private int numberOfComparisons;

    public BooleanOperationResult() {
    }

    public BooleanOperationResult(IPostingsList postingsList, int numberOfDocuments, int numberOfComparisons) {
        this.postingsList = postingsList;
        this.numberOfDocuments = numberOfDocuments;
        this.numberOfComparisons = numberOfComparisons;
    }

    public int getNumberOfDocuments() {
        return numberOfDocuments;
    }

    public void setNumberOfDocuments(int numberOfDocuments) {
        this.numberOfDocuments = numberOfDocuments;
    }

    public IPostingsList getPostingsList() {
        return postingsList;
    }

    public void setPostingsList(IPostingsList postingsList) {
        this.postingsList = postingsList;
    }

    public int getNumberOfComparisons() {
        return numberOfComparisons;
    }

    public void setNumberOfComparisons(int numberOfComparisons) {
        this.numberOfComparisons = numberOfComparisons;
    }
}
