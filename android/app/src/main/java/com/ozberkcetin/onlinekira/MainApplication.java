package com.ozberkcetin.onlinekira;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;
import com.horcrux.svg.SvgPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.sentry.RNSentryPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  public class MyReactNativeHost extends ReactNativeHost implements ReactInstanceHolder {


    protected MyReactNativeHost(Application application) {
      super(application);
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new PickerViewPackage(),
            new SvgPackage(),
            new RNI18nPackage(),
            new RNCardViewPackage(),
              new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
              new VectorIconsPackage(),
              new SplashScreenReactPackage(),
              new RNSentryPackage(MainApplication.this),
              new GoogleAnalyticsBridgePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  }

  private final MyReactNativeHost myReactNativeHost = new MyReactNativeHost(this);



  @Override
  public ReactNativeHost getReactNativeHost() {
    return myReactNativeHost;
  }

  @Override
  public void onCreate() {
    CodePush.setReactInstanceHolder(myReactNativeHost);
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
