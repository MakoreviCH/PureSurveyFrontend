import {IValidationErrorResponse} from "../interfaces/responses/IValidationErrorResponse";

export function getValidationErrorMessages(errorResponse: IValidationErrorResponse): string[] {
    const errorMessages: string[] = [];

    for (const key in errorResponse.errors) {
        if (errorResponse.errors.hasOwnProperty(key)) {
            const errorMessagesForKey = errorResponse.errors[key];
            errorMessagesForKey.forEach((message) => {
                errorMessages.push(`${key}: ${message}`);
            });
        }
    }

    return errorMessages;
}
