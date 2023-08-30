import FormData from "form-data";
import axios, { AxiosRequestConfig } from 'axios'
import { ReadStream, createReadStream } from "fs";

/**
 * @param {File} file File to upload
 * @param {Request} [options] Optional options
 * @returns {string} URL of the uploaded file
 */
export const upload = async (
  file: File | ReadStream, opts?: AxiosRequestConfig
): Promise<string> => {
  try {
  const form = new FormData()
  form.append('uploadType', '0')
  form.append('file', file as unknown as Blob)
  const { data } = await axios.postForm('https://up.m1r.ai/upload', form, opts)
  

  return data.url
  } catch (e) {
    throw new Error(e as any)
  }
}

/**
 * @param {string} path Path to file
 */
export const readFile = async (path: string) => {
  try {
    return createReadStream(path)
  } catch (e) {
    throw new Error(e as any)
  }
}
