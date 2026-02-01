# Trade With Animalcrossing

> Cross-platform trading app for Animal Crossing players built with Vue.js & Ionic

<img src="https://user-images.githubusercontent.com/52916934/97780868-afb2b380-1bca-11eb-84d8-545ca1d934f8.png" width="500">

![App Screenshots](https://user-images.githubusercontent.com/52916934/97780865-a9243c00-1bca-11eb-8185-0963ede724cd.png)

## Features
- Real-time chat with Socket.io
- Post creation with image upload (AWS S3)
- Like/Dislike & Rating review system
- Push notifications (Firebase Cloud Messaging)
- Cross-platform support (Web, Android, iOS)

## Tech Stack
**Frontend:** Vue.js · Ionic · Vuex · Axios · Socket.io

**Mobile:** Capacitor (Android/iOS)

**Cloud:** AWS S3 · Firebase Cloud Messaging

## Architecture
```
Client (Vue.js + Ionic)
    │
    ├── REST API (Axios) ──→ Node.js Server
    │
    └── WebSocket (Socket.io) ──→ Real-time Chat
                                      │
                              ┌───────┴───────┐
                              ↓               ↓
                           AWS S3          FCM Push
                        (Image Storage)  (Notifications)
```

## Trade Process
```mermaid
sequenceDiagram
    participant Seller
    participant Server
    participant Socket
    participant Buyer

    Seller->>Server: Create Post
    Buyer->>Server: Request Trade
    Server->>Seller: Push Notification (FCM)
    Seller->>Server: Accept Trade
    Server->>Socket: Create Chat Room
    Socket-->>Seller: Join Room
    Socket-->>Buyer: Join Room
    loop Real-time Chat
        Seller->>Socket: Send Message
        Socket->>Buyer: Deliver Message
    end
    Note over Seller,Buyer: Trade items in game
    Buyer->>Server: Complete & Review
    Server->>Seller: Update Rating
```

## Related Repository
- **Backend:** [Node.js-project-AnimalCrossing](https://github.com/hyunnnn98/Node.js-project-AnimalCrossing)

## Release
- **Google Play Store:** Released (2020.06)

## Contributing
Issues and PRs are welcome.
