import { FormData } from "formdata-node";
import { fileFromPath } from 'formdata-node/file-from-path';
import { BASE_URL, DEFAULT_USER_AGENT } from "./constants";
import { UploadApiResponse, UploadOptions } from "./types";

/**
 * @param {File | Blob | string} file File to upload or path to file
 * @param {RequestInit & UploadOptions} [options] Optional options
 * @returns {UploadApiResponse} URL of the uploaded file
 */
export const upload = async (
  file: File | Blob | string, opts?: RequestInit & UploadOptions
): Promise<UploadApiResponse> => {
  try {
    if (typeof file == 'string') {
      file = await fileFromPath(file) as unknown as File
    }
    const form = new FormData()
    form.set('uploadType', opts?.uploadType || '0')
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

const doRequest = async (url: string, opts: RequestInit) => {
  return fetch(url, {
    headers: {
      'user-agent': DEFAULT_USER_AGENT,
      ...opts.headers
    },
    ...opts
  })
    .then(async response => {
      const text = await response.text()
      if (/^{.*}$/.test(text)) {
        return JSON.parse(text)
      }
      return text
    })
    .catch(error => {
      throw new Error(error as any)
    });
}
