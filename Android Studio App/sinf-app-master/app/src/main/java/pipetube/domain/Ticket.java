package pipetube.domain;

import android.annotation.SuppressLint;

import java.util.Date;
import java.util.UUID;

import androidx.annotation.NonNull;

public class Ticket {

    private UUID uuid;
    private Integer seat;
    private Boolean used;
    private Date dateOfPurchase;
    private Integer eventUUID;

    protected Ticket() {}

    public Ticket(UUID uuid, Integer seat, Boolean used, Date dateOfPurchase, Integer eventUUID) {
        this.uuid = uuid;
        this.seat = seat;
        this.used = used;
        this.dateOfPurchase = dateOfPurchase;
        this.eventUUID = eventUUID;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Integer getSeat() {
        return seat;
    }

    public void setSeat(Integer seat) {
        this.seat = seat;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Integer getEventUUID() {
        return eventUUID;
    }

    public void setEventUUID(Integer eventUUID) {
        this.eventUUID = eventUUID;
    }

    @SuppressLint("DefaultLocale")
    @NonNull
    @Override
    public String toString() {
        return String.format("Ticker[uuid='%s', seat='%d', used='%b', dateofpurchase='%s', eventuuid='%d']", uuid, seat, used, dateOfPurchase, eventUUID);
    }
}
