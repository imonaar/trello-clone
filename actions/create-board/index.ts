"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { createBoardSchema } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()

    if (!userId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title } = data;
    let board

    try {
        board = await prismadb.board.create({
            data: {
                title
            }
        })
    } catch (e: any) {
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`)
    return {
        data: board
    }
}

export const createBoard = createSafeAction(createBoardSchema, handler)