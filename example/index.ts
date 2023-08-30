import { upload } from "../src";
//
(async () => {
  const img = await upload('./example/test.png', {
    uploadType: '0'
  })
  console.log('Image :', img.url)

  const video = await upload('./example/test.mp4')
  console.log('Video :', video.url)

  const text = await upload('example/test.txt')
  console.log('Text :', text.url)
})()