export enum ApiErrorCodes {
    InvalidPasswordException = 'Invalid password',
    UnexistingEmailException = 'This email is not registered',
    ExistingEmailException = 'This email already exists',
    ApiCommunicationError = 'Something went wrong. Please try again later.',
    UserNotFound = 'User not found',
    InvalidUserClaims = 'User data is invalid',
    TemplateNotFound = 'Template not found',
    UnitAppearanceNotFound = 'Unit appearance not found',
    TargetingNotFound = 'Targeting not found',
    SurveyNotFound = 'Survey not found',
    SurveyUnitNotFound = 'Survey unit not found',
}