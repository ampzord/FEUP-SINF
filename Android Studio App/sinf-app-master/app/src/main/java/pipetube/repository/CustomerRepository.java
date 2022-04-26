package pipetube.repository;

import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;

import pipetube.domain.Customer;
import pipetube.webservice.Webservice;
import retrofit2.Call;

@Singleton
public class CustomerRepository {

    private final Webservice webservice;

    @Inject
    CustomerRepository(Webservice webservice) { this.webservice = webservice; }

    public Call<UUID> createCustomer(Customer costumer) { return webservice.createCustomer(costumer); }
}
