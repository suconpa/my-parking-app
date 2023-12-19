import Box from "@mui/material/Box";
import { Button, Card, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import React from "react";
import DEFAULTIMAGE from '../../../assets/images/default-avatar.png'
import { UserExtraInfo } from "../../../types/classImplementations";

interface MyProfileEditFormProps {
  myInfo: UserDetailInfoType
  userInputRef: { [key in keyof UserBasicInfoType]: React.RefObject<HTMLInputElement|null> }
  userExtraInputRef: { [key in keyof ExtraType]: React.MutableRefObject<HTMLInputElement|null> }
  imageUploadRef: React.RefObject<HTMLInputElement>
  handleImageUpload: () => Promise<void>
  imgFileView: string
  boxImgUpload: () => void
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
  handleSubmit: () => Promise<void>
}

const MyProfileEditForm: React.FC<MyProfileEditFormProps>  = ({
  myInfo,
  userInputRef,
  userExtraInputRef,
  imageUploadRef,
  handleImageUpload,
  imgFileView,
  boxImgUpload,
  modalIsOpen,
  setModalIsOpen,
  closeModal,
  handleSubmit,
}) => {
  return(
  <Box>
      <div>
        {/*프로필 이미지 표시*/}
        <img src={`${myInfo.extra?.profileImage}`}/>
        <Button onClick ={()=>setModalIsOpen(!modalIsOpen)}>프로필사진 변경</Button>
        <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
         <Box>
          <h2 id="child-modal-title">프로필 사진 업로드</h2>
          <Card>
            {imageUploadRef.current === null ? 
                (
                <img src = {DEFAULTIMAGE} alt = "img"></img>
                  )
                  : (
                    <img src = {imgFileView} alt = "img"></img>
                )}    
                <input
                  type="file"
                  ref={imageUploadRef}
                  // multiple
                  onChange={boxImgUpload}
                  accept="image/*"
                  className="upload-btn-inside"
                />
          </Card>
          <Button onClick={handleImageUpload}>업로드하기</Button>
          <Button onClick={closeModal}>닫기</Button>
        </Box>
      </Dialog>
      </div>
      {Object.keys(userInputRef) 
        .filter((v) => v!=='token' && v!=='createdAt' && v!=='updatedAt' && v!== '_id' && v !== "type" && v!=='extra')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth
              required
              inputRef = {userInputRef[item as keyof UserBasicInfoType]}
              defaultValue = {myInfo[item as keyof UserBasicInfoType]}
              name = {item}          
              variant="standard"
              />
            </div>
          );
        })}
        {Object.keys(userExtraInputRef) 
        .filter((v) => v!=='lat' && v!=='lng' && v!=='profileImage')
        .map((item) => {
          return (
            <div key = {item}>
              <div>{item}</div>
              <TextField
              fullWidth 
              required
              inputRef = {userExtraInputRef[item as keyof UserExtraInfo]}
              defaultValue = {myInfo.extra[item as keyof UserExtraInfo]}
              name = {item}           
              variant="standard"
              />
            </div>
          );
        })}
        <Button onClick={handleSubmit}>수정 완료</Button>
    </Box>);
};

export default MyProfileEditForm;
