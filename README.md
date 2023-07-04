# ImapAdSync

**ImapAdSync** (IMAP Adaptive Synchronization) is a **fast** and **adaptive IMAP client synchronization library** for
Node.js.

ImapAdSync is using the two libraries [ImapFlow](https://www.npmjs.com/package/imapflow),
and [mailparser](https://www.npmjs.com/package/mailparser).

## Usage

**ImapAdSync** is simple to use. 

After cloning this repository, follow the steps below (from **Building** onwards).

### General Usage

Generally, **ImapAdSync** 
1. is **initialized** with an `ImapSyncState`
2. and **emits** events through the `AdSyncEventListener`.

#### Initialize
```
// initalize ImapAccount 
let imapAccount: ImapAccount = {
  host: 'imap.examplemail.com',
  port: 993,
  username: 'username',
  password: '12345678',
};

let maxQuota = 25000000000; // in bytes
let imapMailboxStates = [];

// intialize ImapSyncState
let imapSyncState = new ImapSyncState(
  imapAccount,
  maxQuota,
  imapMailboxStates
);

// intialize ImapAdSync and start synchronization
let imapAdSync = new ImapAdSync(this);
await imapAdSync.startAdSync(imapSyncState);       
```

#### Listen to Events
```
// set up AdSyncEventListener 
class <SomeClassInYourNodeProject> implements AdSyncEventListener {
  ...
  // listen to events ...  
  async onMailbox(imapMailbox: ImapMailbox, eventType: AdSyncEventType) {
    console.log(
      `onMailbox ${AdSyncEventType[eventType]} event received => imapMailbox: ${imapMailbox}`
    );
  }
  async onMailboxStatus(imapMailboxStatus: ImapMailboxStatus) {
    console.log(
      `onMailboxStatus event received => imapMailboxStatus: ${imapMailboxStatus}`
    );
  }
  async onMail(imapMail: ImapMail, eventType: AdSyncEventType) {
    console.log(
      `onMail ${AdSyncEventType[eventType]} event received => imapMail: ${imapMail}`
    );
  }
  async onPostpone(postponedUntil: Date) {
    console.log(
      `onPostpone event received => postponedUntil: ${postponedUntil}`
    );
  }
  async onFinish(downloadedQuota: number) {
    console.log(
      `onFinish event received => downloadedQuota: ${downloadedQuota}`
    );
  }
  async onError(imapError: ImapError) {
    console.log(`onError event received => imapError: ${imapError.error}`);
  }    
  ...
}
```

### Building

`npm ci`

`npm run build`

### Example (SimpleImapSync)

`node ./build/main/example/SimpleImapSync.js`

## Algorithm Details

TBD

## License

GNU General Public License Version 3

ImapAdSync Copyright (C) 2023 Johannes Muenichsdorfer

Details, see `LICENSE.txt`

## TODOs

- [ ] Publish library on npm
