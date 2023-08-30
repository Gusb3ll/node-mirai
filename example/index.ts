import { upload, readFile } from "../src";
//
(async () => { 
  const img = await readFile('example/test.png')
  const imgUrl = await upload(img)
  console.log('Image :', imgUrl)

  const video = await readFile('example/test.mp4')
  const videoUrl = await upload(video)
  console.log('Video :', videoUrl)
})()