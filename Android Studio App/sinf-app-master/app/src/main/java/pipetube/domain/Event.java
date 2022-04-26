package pipetube.domain;

import java.io.Serializable;
import java.util.Date;

public class Event implements Serializable {

    private Integer uuid;
    private String name;
    private Date date;
    private Double price;
    private String imageURL;

    protected Event() {}

    public Event(String name, Date date, Double price, String imageURL) {
        this.name = name;
        this.date = date;
        this.price = price;
        this.imageURL = imageURL;
    }

    public Integer getUuid() {
        return uuid;
    }

    public void setUuid(Integer uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}

