# ImapAdSync

**ImapAdSync** (IMAP Adaptive Synchronization) is a **fast** and **adaptive IMAP client synchronization library** for Node.js.

The algorithm provides, in the median, **12,43% faster Email downloads**[^1] in comparision to a naive baseline approach, downloading mails sequentially one after another. Section [Algorithm Details](223325) presents the optimizations conducted within ImapAdSync. ImapAdSync is using the two libraries [ImapFlow](https://www.npmjs.com/package/imapflow), and [mailparser](https://www.npmjs.com/package/mailparser).

### Usage

Generally, **ImapAdSync** 
1. is **initialized** providing an `ImapSyncState`,
2. and afterward **emits** events through the `AdSyncEventListener`.

#### Initialize
```TypeScript
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
```TypeScript
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

*TBD*

## License

GNU General Public License Version 3

ImapAdSync Copyright (C) 2023 Johannes Muenichsdorfer

Details, see `LICENSE.txt`

## TODOs

- [ ] Publish library on NPM

[^1]: J. Muenichsdorfer, "Adaptive Client-Side IMAP Import into an End-To-End Encrypted Email System", Master's Thesis, 2023, on file with author
