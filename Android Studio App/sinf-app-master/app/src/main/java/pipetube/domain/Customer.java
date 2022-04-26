package pipetube.domain;

import java.util.Date;
import java.util.UUID;

public class Customer {

    private UUID uuid;
    private String firstName;
    private String lastName;
    private Long nif;
    private String cardType;
    private Long cardNumber;
    private Date cardValidity;
    private byte[] keyModulus;
    private byte[] keyExponent;
    private Double voucherRatio;

    protected Customer() {}

    public Customer(UUID uuid, String firstName, String lastName, Long nif, String cardType, Long cardNumber, Date cardValidity, byte[] keyModulus, byte[] keyExponent) {
        this.uuid = uuid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nif = nif;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.cardValidity = cardValidity;
        this.keyModulus = keyModulus;
        this.keyExponent = keyExponent;
        this.voucherRatio = 0.0;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getNif() {
        return nif;
    }

    public void setNif(Long nif) {
        this.nif = nif;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Long getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Long cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Date getCardValidity() {
        return cardValidity;
    }

    public void setCardValidity(Date cardValidity) {
        this.cardValidity = cardValidity;
    }

    public byte[] getKeyModulus() {
        return keyModulus;
    }

    public void setKeyModulus(byte[] keyModulus) {
        this.keyModulus = keyModulus;
    }

    public byte[] getKeyExponent() {
        return keyExponent;
    }

    public void setKeyExponent(byte[] keyExponent) {
        this.keyExponent = keyExponent;
    }

    public Double getVoucherRatio() {
        return voucherRatio;
    }

    public void setVoucherRatio(Double voucherRatio) {
        this.voucherRatio = voucherRatio;
    }
}