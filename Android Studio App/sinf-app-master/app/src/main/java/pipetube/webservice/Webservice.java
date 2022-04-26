package pipetube.webservice;

import java.util.UUID;

import pipetube.domain.Customer;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface Webservice {

    @POST("customer/create")
    Call<UUID> createCustomer(@Body Customer costumer);


}