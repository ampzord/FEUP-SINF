package pipetube.domain;

import android.annotation.SuppressLint;

import java.util.Date;

import androidx.annotation.NonNull;

public class Invoice {

    private Integer uuid;
    private Date date;
    private Double totalPrice;
    private String customerUUID;
    private String firstVoucherUUID;
    private String secondVoucherUUID;

    protected Invoice() {}

    public Invoice(Date date, Double totalPrice, String customerUUID, String firstVoucherUUID, String secondVoucherUUID) {
        this.date = date;
        this.totalPrice = totalPrice;
        this.customerUUID = customerUUID;
        this.firstVoucherUUID = firstVoucherUUID;
        this.secondVoucherUUID = secondVoucherUUID;
    }

    public Integer getUuid() {
        return uuid;
    }

    public void setUuid(Integer uuid) {
        this.uuid = uuid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCustomerUUID() {
        return customerUUID;
    }

    public void setCustomerUUID(String customerUUID) {
        this.customerUUID = customerUUID;
    }

    public String getFirstVoucherUUID() {
        return firstVoucherUUID;
    }

    public void setFirstVoucherUUID(String firstVoucherUUID) {
        this.firstVoucherUUID = firstVoucherUUID;
    }

    public String getSecondVoucherUUID() {
        return secondVoucherUUID;
    }

    public void setSecondVoucherUUID(String secondVoucherUUID) {
        this.secondVoucherUUID = secondVoucherUUID;
    }

    @SuppressLint("DefaultLocale")
    @NonNull
    @Override
    public String toString() {
        return String.format("Invoice[id=%d, date='%s', totalprice='%f, customeruuid='%s, firstvoucheruuid='%s, secondvoucheruuid='%s]", uuid, date, totalPrice, customerUUID, firstVoucherUUID, secondVoucherUUID);
    }
}
