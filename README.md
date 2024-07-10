# 🅱️orygon
[![npm](https://img.shields.io/npm/v/borygon?logo=npm&logoColor=white&style=flat-square)](https://www.npmjs.com/package/borygon)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MrSableye/borygon/main.yml?logo=github&logoColor=white&style=flat-square)](https://github.com/MrSableye/borygon/actions/workflows/main.yml)

`🅱️orygon` is a WebSocket client for interacting with [Pokémon Showdown](https://github.com/smogon/pokemon-showdown). It provides strongly typed messages for the Pokémon Showdown messages it supports.  It vends two clients:

- `RawShowdownClient`: A thin wrapper around `ws` that parses incoming Pokémon Showdown messages and exposes them through an event emitter.
- `ManagedShowdownClient`: A more feature-rich wrapper around `RawShowdownClient` that provides more features like retries and convenience functions for logging into Pokémon Showdown

## Project Status
`🅱️orygon` supports the vast majority of Pokémon Showdown messages with an emphasis on supporting events still actively used by Pokémon Showdown and also tries to support older, deprecated messages whenever possible. Through live testing (connecting a bot to several of Pokémon Showdown's public chat rooms and public battles and deserializing/serializing all incoming messages), 99.9999% of messages are accurately handled. Despite this high rate of support, the project will remain below `1.0.0` until:

- all current message types are supported
- all messages types have unit tests
- a canary-like system is implemented to determine if there are any new message usages that break this client's expectations
- full documentation of all public functions and types (especially message types)

`🅱️orygon` can be adopted and should, but care should be taken to handle errors whenever possible as there will likely always be situations that `🅱️orygon` does not handle properly with older messages in replays or new Pokémon Showdown functionality that hasn't been imlemented yet.

### Planned Features
1. A more battle-oriented client that handles similar logic for reading messages and determining the state of a battle, similar to what the Pokémon Showdown client does
2. A convenience tool for parsing replays
3. Ability to override and extend supported message types without modifying source
4. Ability to tune level of runtime typechecking