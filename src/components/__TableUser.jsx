import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { ArrowUpDownIcon, PencilIcon, Search, Trash2Icon, UserPlus2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ModalAddUser from './__ModalAddUser';
import ModalEditUser from './__ModalEditUser';
import ModalDeleteUser from './__ModalDeleteUser';

const TABLE_HEAD = ['Username', 'NRP', 'Role', 'CreatedAt', 'Action'];

const TABLE_ROWS = [
  {
    username: 'John Michael',
    nrp: '001',
    role: 'Manager',
    createdAt: '23/04/18',
    online: true,
  },
  {
    username: 'Alexa Liras',
    nrp: '002',
    role: 'Developer',
    createdAt: '23/04/18',
    online: false,
  },
  {
    username: 'Laurent Perrier',
    nrp: '003',
    role: 'Executive',
    createdAt: '19/09/17',
    online: false,
  },
  {
    username: 'Michael Levi',
    nrp: '004',
    role: 'Developer',
    createdAt: '24/12/08',
    online: true,
  },
  {
    username: 'Richard Gran',
    nrp: '005',
    role: 'Manager',
    createdAt: '04/10/21',
    online: false,
  },
];

export function TableUser({ datas }) {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState(false);
  const [users, setUsers] = useState(datas);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const itemsPerPage = 10;
  const handleOpenAddUser = () => setOpenAddUser(!openAddUser);
  const handleOpenEditUser = () => setOpenEditUser(!openEditUser);
  const handleOpenDeleteUser = () => setOpenDeleteUser(!openDeleteUser);
  const filteredRows = users.filter((row) =>
    row.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const displayedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    if (selectedUser) handleOpenDeleteUser();
  }, [selectedUser]);
  useEffect(() => {
    if (selectedUserEdit) handleOpenEditUser();
  }, [selectedUserEdit]);
  return (
    <>
      <ModalAddUser
        openAddUser={openAddUser}
        handleOpenAddUser={handleOpenAddUser}
        result={(result) => setUsers([...users, result])}
      />
      <ModalEditUser
        openEditUser={openEditUser}
        handleOpenEditUser={handleOpenEditUser}
        data={selectedUserEdit}
        result={(updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user['id-users'] === updatedUser['id-users'] ? updatedUser : user
            )
          );
        }}
      />
      <ModalDeleteUser
        openDeleteUser={openDeleteUser}
        handleOpenDeleteUser={handleOpenDeleteUser}
        data={selectedUser}
        result={(deletedUserId) => {
          setUsers((prevUsers) => prevUsers.filter((user) => user['id-users'] !== deletedUserId));
        }}
      />
      <Card className="h-full w-full bg-gray-800">
        <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-800">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="white">
                Account List
              </Typography>
              <Typography color="white" className="mt-1 font-normal">
                See information about all Account
              </Typography>
            </div>
            <Button
              className="flex items-center gap-3 bg-green-500"
              size="sm"
              onClick={handleOpenAddUser}
            >
              <UserPlus2 strokeWidth={2} className="h-4 w-4 " /> Add account
            </Button>
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<Search className="h-5 w-5" />}
                onChange={handleSearchChange}
                value={search}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-3">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 h"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="flex items-center gap-2 font-normal opacity-70"
                    >
                      {head}{' '}
                      {/* {head !== 'Action' && <ArrowUpDownIcon strokeWidth={2} className="h-4 w-4" />} */}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedRows.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="white" className="font-normal">
                      {item.username}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="white" className="font-normal">
                      {item.nrp}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="white" className="font-normal">
                      {item.role}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="white" className="font-normal">
                      {item.createdAt}
                    </Typography>
                  </td>
                  <td className="p-4 border-b flex gap-2 border-blue-gray-50">
                    <Tooltip content="Edit User">
                      <IconButton
                        className="bg-blue-400"
                        variant="text"
                        onClick={() => setSelectedUserEdit(item)}
                      >
                        <PencilIcon className="h-4 w-4 text-white" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Hapus User">
                      <IconButton
                        className="bg-red-400"
                        variant="text"
                        onClick={() => setSelectedUser(item)}
                      >
                        <Trash2Icon className="h-4 w-4 text-white" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-white p-4">
          <Typography variant="small" color="white" className="font-normal">
            Page {currentPage} of {totalPages}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              color="white"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              color="white"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
