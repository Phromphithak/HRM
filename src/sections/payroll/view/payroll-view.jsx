// payroll-view.jsx
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../payroll-table-row';
import TableEmptyRows from '../table-empty-rows';
import UserTableHead from '../payroll-table-head';
import AppWidgetSummary from '../app-widget-summary';
import UserTableToolbar from '../payroll-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

export default function PayrollPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
  const [users, setUsers] = useState([]);
  const baseURL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5050'  // Set your development API URL
    : 'https://hrmbackend-x4ea.onrender.com';  // Set your production API URL
  axios.defaults.baseURL = baseURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/employees/`);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstName) => {
    const selectedIndex = selected.indexOf(firstName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">PayRoll System</Typography>
        <Button component={Link} to='/addemployees' variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>
      <Box sx={{ justifyContent: 'center' }}>
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="จำนวนพนักงาน"
              total={users.length}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ marginLeft: { xs: 0, md: 3 } }}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ marginLeft: { xs: 0, md: 3 } }}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>
        </Grid>
      </Box>
      <Card sx={{ margin: 2 }}>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'firstName', label: 'Name' },
                  { id: 'employmentType', label: 'ประเภทการจ้างงาน' },
                  { id: 'position', label: 'ตำแหน่ง' },
                  { id: 'salary', label: 'เงินเดือน' },
                  { id: 'tax', label: 'หักเงิน'},
                  { id: 'bonus', label: 'โบนัส'},
                  { id: 'salary_total', label: 'Total'},
                  { id: 'action', label: 'action', align: 'center' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}  // เพิ่ม key prop ในนี้
                      id={row._id}
                      name={row.firstName}
                      position={row.position}
                      status={row.status}
                      email={row.email}
                      salary={row.salary}
                      phonenumber={row.phonenumber}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
