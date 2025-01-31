# Backoffice API SDK

A strongly-typed TypeScript SDK for interacting with the Backoffice API, generated using [Nestia](https://github.com/samchon/nestia).

## Installation

```bash
npm install backoffice-api-sdk
```

## Features

- 🔒 Full TypeScript support with accurate type definitions
- 🚀 Auto-generated from the backend API
- 📦 Built-in error handling
- 🔄 Automatic request/response serialization
- 💪 Type-safe API calls

## Usage

### Setup

```typescript
import api from 'backoffice-api-sdk'
const connection = {
  host: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer your-token', //required only for authenticated routes, not all
    'x-api-key': "your-api-key"
  }
}
```

```typescript
// Login
const session = await api.functional.auth.login(connection, {
email: 'user@example.com',
password: 'password123',
generateRefreshToken: true
})
// Refresh token
const newSession = await api.functional.auth.refresh(connection)
// Logout
await api.functional.auth.logout(connection)
```

### Transactions

```typescript
// Create transaction
const transaction = await api.functional.transactions.create(connection, {
type: 'deposit',
subType: 'reward',
amount: 100,
status: 'pending',
userId: 1
})
// Get all transactions
const transactions = await api.functional.transactions.findAll(connection)
// Get user transactions
const userTransactions = await api.functional.transactions.findAllForUser(connection, 1)
```

### Roles

```typescript
// Create role
const role = await api.functional.roles.create(connection, {
name: 'Admin',
description: 'Administrator role',
permissionIds: [1, 2, 3]
})
// Update role permissions
await api.functional.roles.updatePermissions(connection, {
roleId: 1,
permissions: [1, 2, 3]
})
```

## Error Handling

The SDK uses the `HttpError` class for handling API errors. All errors include:

- HTTP status code
- Error message
- Original response data

```typescript
try {
  await api.functional.auth.login(connection, credentials)
} catch (error) {
  if (error instanceof api.HttpError) {
    console.error(HTTP ${error.status}: ${error.message})
  }
}
```

## Types

All request and response types are fully documented and exported. Key types include:

- `AuthSessionDTO`
- `TransactionDTO`
- `RoleDTO`
- `PermissionDTO`
