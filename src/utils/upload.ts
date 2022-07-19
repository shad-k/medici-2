import apiClient from './apiClient'
import { API_PATHS, CONFIG } from './config'
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const localenv = CONFIG.DEV

/* -------------------------------------------------------------------------- */
/*                              Image Data Upload                             */
/* -------------------------------------------------------------------------- */

export const triggerUploadImageData = async (
  name: string,
  formdata: FormData,
  onImageDataProgress: any) => {
    console.log("Uploading image file " + formdata.get("images"))
  return apiClient.post(
    localenv.api.paths.uploadImageData,
    formdata,
    {
      "headers": {"Content-Type": "form-data"},
      "params": {"collection": name},
      "onUploadProgress": onImageDataProgress
    },
    ).then((response) => {
      console.log(response);
      const res = {
          baseURI: response.data.baseURI,
          totalSupply: response.data.totalSupply,
          randomImageURL: response.data.randomImageURL,
          randomMetadataURL: response.data.randomMetadataURL
      }
      return Promise.resolve(res);
    }).catch((error) => {
      console.log(error);
      return Promise.reject("error");
  })
}

export const triggerUploadMusicData= async (
  name: string,
  formdata: FormData,
  onImageDataProgress: any) => {
  console.log("Uploading music file " + formdata.get("files"))
  return apiClient.post(
    API_PATHS.UPLOAD_MUSIC_DATA,
    formdata,
    {
      "headers": {"Content-Type": "form-data"},
      "params": {"collection": name},
      "onUploadProgress": onImageDataProgress
    },
    ).then((response) => {
      console.log(response);
      const res = {
          baseURI: response.data.baseURI,
          totalSupply: response.data.totalSupply,
          randomImageURL: response.data.randomImageURL,
          randomMetadataURL: response.data.randomMetadataURL
      }
      return Promise.resolve(res);
    }).catch((error) => {
      console.log(error);
      return Promise.reject("error");
  })
}

/* -------------------------------------------------------------------------- */
/*                               Metadata Upload                              */
/* -------------------------------------------------------------------------- */

export const triggerUploadMetadata = async (
name: string,
formdata: FormData,
onMetadataProgress: any) => {
  return apiClient.post(
    localenv.api.paths.uploadMetadata,
    formdata,
    {
    "headers": {"Content-Type": "form-data"},
    "params": {"collection": name},
    "onUploadProgress": onMetadataProgress
    },
    ).then((response) => {
    console.log(response);
    return Promise.resolve("ok");
    }).catch((error) => {
    return Promise.reject("error");
  })
}

/* -------------------------------------------------------------------------- */
/*                                Upload Cover                                */
/* -------------------------------------------------------------------------- */

export const uploadCoverImage = async (name: string, file: File) => {
  const formdata = new FormData();
  formdata.append("cover", file)
  
  return apiClient.post(
    localenv.api.paths.uploadImageCover,
    formdata,
    {
      "headers": {"Content-Type": "form-data"},
      "params": {"collection": name},
    })
    .then(function(response) {
      return Promise.resolve(true);
    }).catch(function(error){
      return Promise.resolve(false);
    });
}

export const createZip = async (files: FileList) => {
  const zip = new JSZip();
  const zipFolder = zip.folder("folder")

  for (let i = 0; i < files.length; i++) {
    zipFolder!.file(files[i].name, files[i])
  }
  console.log(zip)
  return zipFolder!.generateAsync({ type: 'blob' });
}