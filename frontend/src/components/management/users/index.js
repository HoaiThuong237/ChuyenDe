import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";

const ManagementUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://sql-monan.onrender.com/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này không?")) {
      try {
        await axios.put(`https://sql-monan.onrender.com/users/delete/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("❌ Lỗi khi xóa user:", err);
      }
    }
  };

  const handleActive = async (id) => {
    try {
      await axios.put(`https://sql-monan.onrender.com/users/active/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("❌ Lỗi khi mở khóa user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.Name.toLowerCase().includes(search.toLowerCase()) ||
      user.Username.toLowerCase().includes(search.toLowerCase());

    const matchesActive =
      filterActive === "all"
        ? true
        : filterActive === "active"
        ? user.Active === true
        : user.Active === false;

    return matchesSearch && matchesActive;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Quản lý người dùng
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Tìm kiếm người dùng"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={filterActive}
            label="Trạng thái"
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="active">Đang hoạt động</MenuItem>
            <MenuItem value="inactive">Đã vô hiệu hóa</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hoạt động</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.ID}>
                  <TableCell>{user.ID}</TableCell>
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.Username}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  <TableCell>{user.Active ? "Hoạt động" : "Khóa"}</TableCell>
                  <TableCell align="center">
                    {user.Active ? (
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.ID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="success"
                        onClick={() => handleActive(user.ID)}
                      >
                        <LockOpenIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có người dùng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang"
        />
      </TableContainer>
    </Box>
  );
};

export default ManagementUsers;
