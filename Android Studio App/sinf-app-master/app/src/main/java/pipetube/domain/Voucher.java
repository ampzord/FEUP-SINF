package pipetube.domain;

import java.util.UUID;

public class Voucher {

    private UUID uuid;
    private String productCode;
    private Boolean used;
    private UUID customerUUID;

    protected Voucher() {}

    public Voucher(UUID uuid, String productCode, Boolean used, UUID customerUUID) {
        this.uuid = uuid;
        this.productCode = productCode;
        this.used = used;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public UUID getCustomerUUID() {
        return customerUUID;
    }

    public void setCustomerUUID(UUID customerUUID) {
        this.customerUUID = customerUUID;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }
}