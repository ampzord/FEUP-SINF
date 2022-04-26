package pipetube.domain;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;

public class Product {

    private Integer uuid;
    private String name;
    private Double price;

    protected Product() {}

    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @SuppressLint("DefaultLocale")
    @NonNull
    @Override
    public String toString() {
        return String.format("Product[id=%d, name='%s', price='%f]", uuid, name, price);
    }
}
