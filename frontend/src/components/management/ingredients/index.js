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
  Stack,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ManagementIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchIngredients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ingredients");
      setIngredients(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách users:", err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xoá nguyên liệu này không?")){
        try {
        await axios.put(`http://localhost:5000/ingredients/delete/${id}`);
        window.alert("Xóa nguyên liệu thành công.")
        fetchIngredients();
        } catch (err) {
            window.alert("Xóa nguyên liệu thất bại.")
        console.error("❌ Lỗi khi xóa nguyên liệu:", err);
    }}
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch =
      ingredient.Name.toLowerCase().includes(search.toLowerCase())

    return matchesSearch;
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
        Quản lý nguyên liệu 
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Tìm kiếm nguyên liệu"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên nguyên liệu</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIngredients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ingredient) => (
                <TableRow key={ingredient.ID}>
                  <TableCell>{ingredient.ID}</TableCell>
                  <TableCell>{ingredient.Name}</TableCell>
                  <TableCell>{ingredient.Unit}</TableCell>
                  <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(ingredient.ID)}>
                        <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredIngredients.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có nguyên liệu nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredIngredients.length}
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

export default ManagementIngredients;
