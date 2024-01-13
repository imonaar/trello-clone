import { z } from 'zod'

export type FieldErrors<T> = {
    [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
    fielErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
} // notice all fields are optional

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            return {
                fielErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
            }
        }

        return handler(validationResult.data)
    }
}