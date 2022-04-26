package pipetube.dependencyinjection;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.inject.Singleton;

import dagger.Module;
import dagger.Provides;
import pipetube.webservice.Webservice;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

@Module
public class NetworksModule {
    private String urlPath;

    public NetworksModule(String urlPath) {
        this.urlPath = urlPath;
    }

    @Singleton
    @Provides
    Gson provideGson() {
        GsonBuilder builder = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        return builder.create();
    }

    @Singleton
    @Provides
    Retrofit provideRetrofit(Gson gson) {
        return new Retrofit.Builder()
                .baseUrl(urlPath)
                .addConverterFactory(ScalarsConverterFactory.create())
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
    }

    @Singleton
    @Provides
    Webservice provideWebService(Retrofit retrofit) {
        return retrofit.create(Webservice.class);
    }
}
