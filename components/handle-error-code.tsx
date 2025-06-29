"use client"
import { toast } from "@/hooks/use-toast"


const handleErrorCode = (code: string) => {
    switch (code) {
        case '404':
            toast({
                title: "Not Found",
                description: "Requested resource could not be found.",
                variant: "destructive",
            });
            break;

        case '23503': // Foreign key violation
            toast({
                title: "Submission Error",
                description: "Invalid reference detected during submission.",
                variant: "destructive",
            });
            break;

        case '23502': // Not null violation
            toast({
                title: "Missing Required Data",
                description: "Some required fields are missing or incomplete.",
                variant: "destructive",
            });
            break;

        case '23505': // Unique violation
            toast({
                title: "Duplicate Entry",
                description: "This item has already been submitted.",
                variant: "default",
            });
            break;

        case '22001': // Value too long
            toast({
                title: "Input Too Long",
                description: "One or more values exceed the allowed length.",
                variant: "destructive",
            });
            break;

        case '42601': // Syntax error
            toast({
                title: "Invalid Input Format",
                description: "The submitted data has an invalid format.",
                variant: "destructive",
            });
            break;

        case '42501': // Insufficient privilege
            toast({
                title: "Access Denied",
                description: "You do not have permission to perform this action.",
                variant: "destructive",
            });
            break;

        case '08006': // Connection failure
        case '08003': // Connection does not exist
        case '08004': // Operation not supported
            toast({
                title: "Connection Error",
                description: "A network or database connection issue occurred.",
                variant: "destructive",
            });
            break;

        default:
            toast({
                title: "Unexpected Error",
                description: "An unknown error occurred. Please try again later.",
                variant: "destructive",
            });
    }
};

export default handleErrorCode
