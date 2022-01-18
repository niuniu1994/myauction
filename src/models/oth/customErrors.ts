export class UnauthorizedError extends Error {}

export class UnloggedError extends UnauthorizedError {
  constructor() {
    super('You are not logged in')
  }
}

export class EntityNotFoundError extends Error{}

export class TokenInvalidError extends Error{}

export class InvalidInputError extends Error{}

export class InvalidPriceError extends Error{};