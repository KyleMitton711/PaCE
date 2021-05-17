const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = new BlobServiceClient(`https://pacedevstore.blob.core.windows.net/?sv=2020-02-10&ss=b&srt=o&sp=rwdlacx&se=2025-04-20T07:59:31Z&st=2021-04-19T23:59:31Z&spr=https&sig=zvV3O6Y7uNIhlm3hezQUMay9lRfLDBh7bb7ZgOKEKYI%3D`);

const containerName = "project";

async function upload(file) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = file;
  let filename = file.name.split('.');
  let fileext = filename.pop();

  const blobName = filename.join('.') + new Date().getTime() + '.' + fileext;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blockBlobClient.uploadBrowserData(file, options);
  
  return 'https://pacedevstore.blob.core.windows.net/project/' + blobName;
}

export {
  upload
}