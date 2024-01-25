export class MandatoryFieldError extends Error {
  constructor() {
    super('This field is mandatory.')
  }
}
