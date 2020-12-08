# @showderp/pokemon-showdown-ts
`@showderp/pokemon-showdown-ts` is a WebSocket client for interacting with [Pokémon Showdown](https://github.com/smogon/pokemon-showdown). It provides strongly typed events for the events it currently supports. It vends a simple, dumb, "raw" client that simply allows the user to send raw messages and receive strongly typed events as a response. It also vends a "pretty" client that includes logging in and connection retries.

## What is the status of this project?
Right now, this project supports all battle events that Pokémon Showdown claims to support. However, I am not 100% confident in this and I am not 100% confident it will handle messages from things like old replays. It is also missing a fair amount of chat/system messages as well. Until I feel confident that this client operates properly when encountering >99.9% of events, this project will remain in version <`1.0.0`. Once it reaches that threshold, I will release it as `1.0.0`.

In the meantime, any version <`1.0.0` should be considered unstable and "use at your own risk".