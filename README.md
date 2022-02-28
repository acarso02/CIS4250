# CIS4250

## Required Installations to Run Project
- yarn (Any version) installed on native terminal (e.g. Windows = powershell)
- npm (Less than v8.0.0) yarn install npm
- node (Version v16.14.0 or less) Installed online
- expo (v5.2.0) npm install expo
- eas-cli (v0.47.0) sudo npm install -g eas-cli

## Npm requirements
- npm install --save firebase
- npm install @react-native-firebase/app
- npm install @react-native-firebase/auth
- npm install @react-native-firebase/storage
- npm install @react-navigation/bottom-tabs
- npm install @react-navigation/native
- npm install @react-navigation/native-stack
- npm install @expo/vector-icons

## Requirements for running the app
- sudo chown -R $USER /usr/local/lib/node_modules
- eas build:configure
- expo run:android -d

## IF YOU ARE GETTING PERMISSION ERRORS
- Remove .expo from your C:/Users/username directory