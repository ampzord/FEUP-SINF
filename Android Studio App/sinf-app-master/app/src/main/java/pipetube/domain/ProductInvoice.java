package pipetube.domain;

import android.annotation.SuppressLint;

import java.io.Serializable;

import androidx.annotation.NonNull;

public class ProductInvoice implements Serializable {

    private Integer orderUUID;
    private Integer productUUID;

    protected ProductInvoice() {}

    public ProductInvoice(Integer orderUUID, Integer productUUID) {
        this.orderUUID = orderUUID;
        this.productUUID = productUUID;
    }

    public Integer getOrderUUID() {
        return orderUUID;
    }

    public void setOrderUUID(Integer orderUUID) {
        this.orderUUID = orderUUID;
    }

    public Integer getProductUUID() {
        return productUUID;
    }

    public void setProductUUID(Integer productUUID) {
        this.productUUID = productUUID;
    }

    @SuppressLint("DefaultLocale")
    @NonNull
    @Override
    public String toString() {
        return String.format("Product Order[orderuuid='%d', productuuid='%d']", orderUUID, productUUID);
    }
}
