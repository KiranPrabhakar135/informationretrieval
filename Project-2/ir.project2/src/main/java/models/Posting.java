package models;

public class Posting{
    public Posting(int value){
        this.value = value;
    }
    private int value;
    private Posting next;
    private Posting parent;
    private Posting skipTo;

    public Integer getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Posting getNext() {
        return next;
    }

    public void setNext(Posting next) {
        this.next = next;
    }

    public Posting getParent() {
        return parent;
    }

    public void setParent(Posting parent) {
        this.parent = parent;
    }

    public Posting getSkipTo() {
        return skipTo;
    }

    public void setSkipTo(Posting skipTo) {
        this.skipTo = skipTo;
    }
}