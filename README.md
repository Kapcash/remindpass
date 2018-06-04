# RemindPass

## Features

RemindPass is a simple Ionic 3 app that keep safe your passwords locally. Instead of using a huge password manager, managing your passwords for you, keep the controle and secure them into this safe password annuary!

The app contains the following features:

- Store passwords locally and crypt them
- Authenticate on the app with a root password or TouchId

I use SHA256 to crypt the root Password, and AES to store passwords on the device app storage.

In the feature, I plan to add the following features:
- Sort passwords by most recent, category, name
- Customize apparence
- Delete or edit password by sliding list items

## Interested in helping?

You can freely join the [Trello](https://trello.com/b/xhwOGt2C/remindpass) I use to follow the advancement of the app.  
Feel free to ask me whatever you want about the project ;-)

### Steps for developping

First thing, clone this repository

```bash
git clone git@github.com:Kapcash/remindpass.git
```

You should install globally the ionic and cordova cli:
```bash
npm install -g ionic cordova`
```

Then, run `ionic serve -c` to start the app on browser (or on device with the [Ionic DevApp](https://ionicframework.com/docs/pro/devapp/))

The app uses some Native functionnalities, that are not available in browsers.

I personnaly use *Visual Studio Code* for the development of the project. There are several debugging tasks defined:
- Attach to Chrome with sourcemaps: Attach the VSCode debugger to a running tab. You have to run the app on a tab with `ionic serve [-c]`
- Run Android on device: Install the app on an Android device connected available via adb. You can also run manually `ionic cordova run android`.

You're ready to go!

