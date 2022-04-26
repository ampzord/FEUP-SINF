package pipetube.initializer;

import android.app.Application;

import pipetube.adapter.Constants;
import pipetube.dependencyinjection.ApplicationComponent;
import pipetube.dependencyinjection.DaggerApplicationComponent;
import pipetube.dependencyinjection.NetworksModule;

public class PipeTubeApplication extends Application {
    private ApplicationComponent applicationComponent;

    @Override
    public void onCreate() {
        super.onCreate();

        applicationComponent = DaggerApplicationComponent.builder()
                                .networksModule(new NetworksModule(Constants.URL))
                                .build();
    }

    public ApplicationComponent getApplicationComponent(){
        return applicationComponent;
    }
}
