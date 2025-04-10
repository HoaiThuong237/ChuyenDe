import { Dialog, styled } from "@mui/material";

// Dialog Nhỏ
const SmallDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "300px",
    maxWidth: "90%",
  },
});

// Dialog Trung Bình
const MediumDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "90%",
  },
});

// Dialog Lớn
const LargeDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    width: "900px",
    maxWidth: "90%",
  },
});

export { SmallDialog, MediumDialog, LargeDialog };
