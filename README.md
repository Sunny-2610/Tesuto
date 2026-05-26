# Tesuto

A lightweight API client built into your VS Code sidebar. Test your APIs without switching to another app.

## Features

- Send HTTP requests — GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- Add custom headers with a simple key-value editor
- Write and validate JSON request bodies
- Save requests into collections for quick reuse
- View full request history and replay with one click
- Store Bearer tokens and inject them automatically

## How to Use

1. Click the Tesuto icon in the Activity Bar
2. Enter a URL and select a method
3. Add headers or a body if needed
4. Click **Send** or press `Ctrl+Enter`

## Saving Requests

1. Go to the **Collections** tab and create a new collection
2. Build your request then select a collection from the dropdown
3. Click **Save** and give it a name

## Token Management

1. Go to the **Tokens** tab
2. Click **Add Token** and enter your JWT or API key
3. Click **Use** — Tesuto will automatically add it as a Bearer token on every request

## Requirements

- VS Code `^1.85.0`

## License

MIT