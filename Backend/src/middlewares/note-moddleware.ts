import { check, ValidationChain } from "express-validator";

export const createNoteValidator: ValidationChain[] = [
    check("hashID")
        .notEmpty().withMessage("The hashID field is required.")
        .custom((value: string) => {
            if (value.includes("#")) {
                throw new Error('The hashID should not contain "#"');
            }
            return true;
        }),
    check("content")
        .notEmpty().withMessage("The content field is required.")
        .isLength({ min: 2 }).withMessage("Content should be at least 1 characters long."),
    check("noteType")
        .custom((value: string) => {
            const noteType = value.toLowerCase();
            if (noteType !== "lexical" && noteType !== "markdown") {
                throw new Error("The noteType must be either 'lexical' or 'markdown'.");
            }
            return true;
        }).toLowerCase()
        .optional(),
    check("owner")
        .isString().withMessage("The owner must be a string.")
        .optional(),
    check("isProtected")
        .isBoolean().withMessage("The isProtected field must be a boolean.")
        .optional(),
];


export const checkNoteExistValidator: ValidationChain[] = [
    check("hashID")
        .notEmpty().withMessage("The hashID field is required.")
        .custom((value: string | undefined) => {

            if (value && value.includes("#")) {
                throw new Error('The hashID should not contain "#"');
            }
            return true;
        }),
]
