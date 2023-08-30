type ApiResponse = {
    success: boolean
    message: string
}

export type UploadApiResponse = {
    id?: string
    url?: string
    info?: {
        boxId?: string
        fileId?: string
    }
} & ApiResponse

type ApiOptions = {
    userToken?: string
}

export type UploadOptions = {
    uploadType?: string
} & ApiOptions