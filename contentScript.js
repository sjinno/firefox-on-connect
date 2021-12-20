// content-script.js

const userBrowser =
    navigator.userAgent.indexOf('Firefox') > -1 ? browser : chrome;

console.log(
    'SHOHEI@contentScript.js:6 ##### VAR: "userBrowser" =',
    userBrowser,
);

var myPort = userBrowser.runtime.connect({ name: 'port-from-cs' });
myPort.postMessage({ greeting: 'hello from content script' });

myPort.onMessage.addListener(function (m) {
    console.log('In content script, received message from background script: ');
    console.log(m.greeting);
});

document.body.addEventListener('click', function () {
    myPort.postMessage({ greeting: 'they clicked the page!' });
});
