package pipetube.dependencyinjection;

import javax.inject.Singleton;

import dagger.Component;
import pipetube.MainActivity;
import pipetube.RegisterActivity;
import pipetube.fragments.RegisterFirstFragment;
import pipetube.fragments.Orcamento;

@Singleton
@Component(modules = {NetworksModule.class})
public interface ApplicationComponent {
    void inject(RegisterActivity activity);
    void inject(MainActivity mainActivity);
    void inject(RegisterFirstFragment registerFirstFragment);
    void inject(Orcamento orcamento);

}
