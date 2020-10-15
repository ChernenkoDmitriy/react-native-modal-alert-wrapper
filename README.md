# react-native-modal-wrapper

`npm install --save react-native-modal-alert-wrapper`

This package was designed to work with react-native's Modal and Alert components. When working with native components, the screen may be locked when these two components are called.

You don't need to change the code, just replace one component:

Use AlertWrapper insted Alert

```js
    AlertWrapper.alert('title', 'My message', [{ text: 'Ok', onPress: () => { console.log('Ok') }}]);
```