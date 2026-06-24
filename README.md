# ❄️ Snow Globe FM

> *Two strangers just co-produced a beat and split royalties — without knowing they used a blockchain.*

A collaborative generative lo-fi music platform on **Sui Network**. Drop a stem. Wait for 7 others. Shake the globe. Get paid.

---

## 🌨️ How It Works

```
you drop a stem  →  7 strangers drop theirs  →  globe shakes  →  beat tape materialises  →  royalties split on-chain
```

1. **Drop** — Pick a lo-fi audio stem (chords, drums, bass, melody, FX). Your Snowball NFT is minted on Sui with randomised visual traits generated via on-chain randomness.
2. **Wait** — The shared Snow Globe fills up. Watch other contributors' snowballs orbit inside in real time.
3. **Shake** — At 8 drops, anyone can shake the globe. A unique beat tape + generative artwork is produced atomically.
4. **Claim** — Every contributor gets an equal royalty share. Stored on-chain. Claimable any time. No middlemen.

---

## 🛠️ Built With

| Layer | Tech |
|---|---|
| Blockchain | Sui Network (Move) |
| Storage | Walrus (audio stems + artwork) |
| Randomness | Sui On-chain Randomness (snowball traits) |
| Transactions | Programmable Transaction Blocks |
| Auth | zkLogin (drop with Twitter, no wallet needed) |
| Frontend | Next.js 14 + TypeScript + Tailwind |
| Audio | Tone.js (client-side stem layering) |
| Animation | Framer Motion |

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/snow-globe-fm
cd snow-globe-fm
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) and drop your first stem.

**You'll need a Sui wallet** — grab [Sui Wallet](https://wallet.sui.io) for Chrome. Devnet SUI is free from the [faucet](https://faucet.sui.io).

---

## 📁 Project Structure

```
src/
├── app/              # Next.js pages (home, vault, profile)
├── components/
│   ├── globe/        # GlobeCanvas, GlobeProgress, ShakeScreen
│   ├── stem/         # StemCard, StemSelector, DropModal
│   └── ui/           # FrostedCard, TraitChip, AudioPlayer
├── hooks/            # useGlobeState, useAudioEngine
├── lib/
│   ├── sui/          # client, transactions, queries
│   ├── audio/        # Tone.js engine
│   └── walrus/       # blob upload/fetch
└── types/            # Snowball, Globe, Stem, Contributor
```

---

## 🎛️ Sui Stack

This project uses Sui for real, not just as a payment rail:

- **Shared Objects** — The Snow Globe is a shared object written to by multiple users concurrently. Sui handles this natively; on other chains this needs careful locking.
- **On-chain Randomness** — Snowball visual traits are generated via Sui's verifiable randomness module. Can't be gamed by anyone.
- **Programmable Transaction Blocks** — The shake atomically mints the beat tape, finalises traits, and records royalty shares in one transaction. All or nothing.
- **Walrus** — Audio stems and generated artwork live on Walrus. The contract stores only the blob ID — cheap, fast, decentralised.
- **zkLogin** — Twitter users can drop a stem without ever creating a wallet or buying gas. They just don't know it.

---

## 🔧 Contract Deployment

```bash
# Build and deploy Move contracts
sui move build
sui client publish --gas-budget 100000000

# Copy the package ID and globe object ID into:
# src/lib/constants.ts → PACKAGE_ID, GLOBE_OBJECT_ID
```

---

## 🎬 Demo Mode

Hit the **Demo Mode** button on the homepage to simulate all 8 drops as a single user — useful for showing the full shake flow without coordinating 8 people. Great for judges. Great for your sanity.

---

## 🌊 Screens

| Screen | What It Is |
|---|---|
| `/` | Live globe, drop flow, shake trigger |
| `/vault` | Archive of all past beat tapes |
| `/profile` | Your Snowball NFTs + claimable royalties |

---

## 🏔️ Roadmap (Post-Hackathon)

- [ ] Open stem uploads (any audio, not just curated pool)
- [ ] Variable royalty weights based on rarity traits
- [ ] DeepBook integration for beat tape secondary market
- [ ] Multi-globe sessions running in parallel
- [ ] Mobile app

---

## 🤝 Contributing

PRs welcome. If you're a lo-fi producer and want your stems in the pool, open an issue.

---

## 📄 License

MIT — make music, not war.

---

*Built for the [Lofi Yeti CLAY Hackathon](https://hackathon.lofitheyeti.com) · Sui Network · 2026*
