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

const ManagementRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách công thức:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công thức này không?")) {
      try {
        await axios.put(`http://localhost:5000/recipes/delete/${id}`);
        window.alert("Xóa công thức thành công.");
        fetchRecipes();
      } catch (err) {
        window.alert("Xóa công thức thất bại.");
        console.error("❌ Lỗi khi xóa công thức:", err);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.Title.toLowerCase().includes(search.toLowerCase())
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
        Quản lý công thức
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Tìm kiếm công thức"
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
              <TableCell>Tên công thức</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Tác giả</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Số nguyên liệu</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecipes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((recipe) => (
                <TableRow key={recipe.RecipeID}>
                  <TableCell>{recipe.RecipeID}</TableCell>
                  <TableCell>{recipe.Title}</TableCell>
                  <TableCell>{recipe.Description}</TableCell>
                  <TableCell>{recipe.Author}</TableCell>
                  <TableCell>{new Date(recipe.Created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{recipe.Ingredients.length}</TableCell>
                  <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(recipe.RecipeID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredRecipes.length === 0 && (
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
          count={filteredRecipes.length}
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

export default ManagementRecipes;
