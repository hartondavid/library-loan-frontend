import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { apiGetPastLoans, apiGetPastLoansByStudentId, apiUpdateLoanStatus, apiDeleteLoan } from "../../api/loans";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import dayjs from 'dayjs';
import { addStyleToTextField } from "../../utils/utilFunctions";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const colorMap = {
    pending: 'orange',
    active: 'blue',
    returned: 'green',
    overdue: 'red'
};


const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'student_name', headerName: 'Student', type: 'string' },
    { field: 'title', headerName: 'Titlu', type: 'string' },
    { field: 'author', headerName: 'Autor', type: 'string' },
    { field: 'photo', headerName: 'Foto', type: 'filepath' },
    {
        field: 'quantity', headerName: 'Cantitate', type: 'string', renderCell: ({ value }) => {
            return value + ' buc';
        }
    },
    {
        field: 'status', headerName: 'Status', type: 'string',
        renderCell: ({ value }) => {
            const statusMap = {
                pending: 'In asteptare',
                active: 'In curs',
                returned: 'Returnata',
                overdue: 'Peste termen'
            };

            const statusLabel = statusMap[value] || value;
            const color = colorMap[value] || 'default';

            return (
                <Chip
                    label={statusLabel}
                    variant="outlined"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color: color,
                        borderColor: color,

                    }}
                    onClick={() => {

                    }}

                />
            );
        }
    },

    {
        field: 'start_date', headerName: 'Data de inceput', type: 'string', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY HH:mm');
        }
    },
    {
        field: 'end_date', headerName: 'Data de sfarsit', type: 'string', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY HH:mm');
        }
    },


];


const History = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const rightCode = userRights[0]?.right_code;

    const [actions, setActions] = useState([]);
    const [openDeleteLoanDialog, setOpenDeleteLoanDialog] = useState(false);
    const [loanToDelete, setLoanToDelete] = useState(null);


    useEffect(() => {
        console.log('rightCode', rightCode);

        if (rightCode === RIGHTS_MAPPING.LIBRARIAN) {
            apiGetPastLoans((response) => {
                setData(response.data);
                console.log('rezervari doctor', response.data);
            }, showErrorToast);
            setActions([
                {
                    icon: <DeleteIcon />, color: 'red', onClick: (id) => handleOpenDeleteLoanDialog(id)
                }
            ]);
        } else if (rightCode === RIGHTS_MAPPING.STUDENT) {
            apiGetPastLoansByStudentId((response) => {
                setData(response.data);
                console.log('rezervari student', response.data);
            }, showErrorToast);
        } else if (rightCode === RIGHTS_MAPPING.ADMIN) {
            apiGetPastLoans((response) => {
                setData(response.data);
                console.log('rezervari admin', response.data);
            }, showErrorToast);
        }


    }, [data.length, rightCode]);


    const handleDeleteLoanRequest = () => {
        apiDeleteLoan((response) => {
            showSuccessToast(response.message);
            const updatedData = data.filter((loan) => loan.id !== loanToDelete);
            setData(updatedData);
            setOpenDeleteLoanDialog(false);

        }, showErrorToast, loanToDelete);
    };

    const handleCloseDeleteLoanDialog = () => {
        setOpenDeleteLoanDialog(false);
    };

    // Function to open the delete confirmation dialog
    const handleOpenDeleteLoanDialog = (loanId) => {
        setLoanToDelete(loanId); // Store the seminar ID to be deleted
        setOpenDeleteLoanDialog(true); // Open the dialog
    };

    return (
        <>
            <GenericTable

                title={"Istoric imprumuturi"}
                columns={columns}
                data={data}
                actions={actions}

            >

            </GenericTable>

            <Dialog open={openDeleteLoanDialog} onClose={handleCloseDeleteLoanDialog}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa stergi imprumutul?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteLoanDialog} sx={{ backgroundColor: ' #7B3F00', color: 'white' }}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteLoanRequest} variant="contained" color="error">
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>



        </>
    );
};
export default History;