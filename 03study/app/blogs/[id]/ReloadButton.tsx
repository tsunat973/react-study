'use client'

import { reloadBlog } from "./actions"

export default function ReloadButton({ id }: { id: string }) {
    return (
        <form action={reloadBlog}>
            <input type="hidden" name="id" value={id} />
            <button type="submit">Reload</button> 
        </form>
    )
}