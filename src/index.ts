import { FormData } from "formdata-node";
import { fileFromPath } from 'formdata-node/file-from-path';
import { BASE_URL, DEFAULT_USER_AGENT } from "./constants";
import { UploadResponse, UploadOptions } from "./types";

const doRequest = async (url: string, opts: RequestInit) => {
  try {
  return fetch(url, {
    headers: {
      'User-Agent': DEFAULT_USER_AGENT,
      ...opts.headers
    },
    ...opts
  }).then(async res => {
      const text = await res.text()
      if (/^{.*}$/.test(text)) {
        return JSON.parse(text)
      }
    
      return text
    })
  } catch (e) {
    throw new Error(e as any)
  }
}


/**
 * @param { File | Blob | string } file File to upload or path to file
 * @param { RequestInit & UploadOptions } [options] Optional options
 * @returns { UploadApiResponse } URL of the uploaded file
 */
export const upload = async (
  file: File | Blob | string, opts?: RequestInit & UploadOptions
): Promise<UploadResponse> => {
  try {
    const form = new FormData()
    form.set('uploadType', opts?.uploadType || '0')
    if (typeof file == 'string') {
      file = await fileFromPath(file) as unknown as File
    }
    form.set('file', file)

    const data = await doRequest(`${BASE_URL}/upload`, {
      method: 'POST',
      body: form as unknown as BodyInit,
      ...opts
    })
    if (!data.success) {
      throw new Error('Upload failed: ' + (data.message || data))
    }

    return data
  } catch (e) {
    throw new Error(e as any)
  }
}