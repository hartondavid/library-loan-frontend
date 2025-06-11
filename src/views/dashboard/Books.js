import React, { useState, useEffect } from "react";
import { apiGetBooks } from "../../api/books";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";
import { RIGHTS_MAPPING } from '../../utils/utilConstants';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItemButton, ListItemText, Box } from '@mui/material';
import { addStyleToTextField } from '../../utils/utilFunctions';
import { apiAddLoan } from "../../api/loans";

const Books = ({ userRights }) => {

    const [data, setData] = useState([]);

    const rightCode = userRights[0]?.right_code;

    const [openAddLoanDialog, setOpenAddLoanDialog] = useState(false);
    const [loanToAdd, setLoanToAdd] = useState(null);


    // const currDate = new Date();
    // currDate.setSeconds(0);
    // currDate.setMilliseconds(0);
    // currDate.setMinutes(0);

    // const toDatetimeLocal = (date) => {
    //     if (!date) return '';
    //     // Convert UTC date to local datetime-local string (yyyy-MM-ddTHH:mm)
    //     const d = new Date(date);
    //     d.setSeconds(0, 0);
    //     const off = d.getTimezoneOffset();
    //     const local = new Date(d.getTime() - off * 60 * 1000);
    //     return local.toISOString().slice(0, 16);
    // };
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        quantity: ''
    });

    const [completedForm, setCompletedForm] = useState(false);

    useEffect(() => {
        apiGetBooks(
            (response) => {
                if (response.data) {
                    console.log('books', response.data);
                    setData(response.data);
                }
            },
            showErrorToast
        );
    }, []);



    // Function to open the delete confirmation dialog
    const handleOpenAddLoanDialog = (bookId) => {
        setLoanToAdd(bookId); // Store the seminar ID to be deleted
        setOpenAddLoanDialog(true); // Open the dialog

        console.log('bookId', bookId);
    };


    const handleAddLoanRequest = () => {



        // Convert local datetime-local input to UTC ISO string
        const toUTCISOString = (localDateString) => {
            if (!localDateString) return null;
            // localDateString is in 'yyyy-MM-ddTHH:mm' format
            const local = new Date(localDateString);
            return local.toISOString(); // always UTC
        };

        apiAddLoan((response) => {
            showSuccessToast(response.message);
            setOpenAddLoanDialog(false);

            // const updatedData = data.filter((book) => book.id !== loanToAdd);
            // setData(updatedData);

            setData(data.map((book) => book.id === loanToAdd ? { ...book, quantity: book.quantity - formData.quantity } : book));

            console.log('loanToAdd', loanToAdd);
        }, showErrorToast, loanToAdd, formData.quantity, toUTCISOString(formData.start_date), toUTCISOString(formData.end_date));
    };

    const handleCloseAddLoanDialog = () => {
        setOpenAddLoanDialog(false);
        setFormData({
            start_date: '',
            end_date: '',
            quantity: ''
        });
        setLoanToAdd(null);
    };

    useEffect(() => {
        const isFormCompleted =
            formData.start_date &&
            formData.end_date &&
            formData.quantity;

        setCompletedForm(isFormCompleted);
    }, [formData]);


    return (
        <>
            <ProductCards
                data={data}
                products={data}
                title="Carti"
                editButton={rightCode === RIGHTS_MAPPING.LIBRARIAN}
                deleteButton={rightCode === RIGHTS_MAPPING.LIBRARIAN}
                setProducts={setData}
                addButton={rightCode === RIGHTS_MAPPING.LIBRARIAN}
                reserveButton={rightCode === RIGHTS_MAPPING.STUDENT}
                reserveButtonAction={handleOpenAddLoanDialog}
            />

            <Dialog open={openAddLoanDialog} onClose={handleCloseAddLoanDialog}>
                <DialogTitle>Imprumuta carte</DialogTitle>
                <DialogContent >


                    <Box
                        component="form"
                        onSubmit={handleAddLoanRequest}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        gap={2}
                        sx={{
                            backgroundColor: 'white',
                            width: '100%'
                        }}
                    >

                        <Box sx={{ position: 'relative', width: '100%' }}>

                            <TextField
                                label="Data de inceput"
                                type="datetime-local"
                                name="start_date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                style={{ marginTop: '1rem' }}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16),
                                }}
                                sx={addStyleToTextField(formData.start_date)}

                            />
                        </Box>

                        <Box sx={{ position: 'relative', width: '100%' }}>

                            <TextField
                                label="Data de sfarsit"
                                type="datetime-local"
                                name="end_date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                style={{ marginTop: '1rem' }}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16),
                                }}
                                sx={addStyleToTextField(formData.end_date)}

                            />
                        </Box>


                        <Box sx={{ position: 'relative', width: '100%' }}>

                            <TextField
                                label="Cantitate"
                                name="quantity"
                                type='number'
                                value={formData.quantity || ''}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                sx={addStyleToTextField(formData.quantity)}
                            >
                            </TextField>
                        </Box>


                    </Box>


                </DialogContent>
                <DialogActions>


                    <Button onClick={handleAddLoanRequest} style={{
                        backgroundColor: ' #7B3F00', color: 'white', ...(!completedForm && {
                            backgroundColor: ' #7B3F00',
                            opacity: 0.5,
                            color: 'white',
                        })
                    }}
                        disabled={!completedForm}>
                        Imprumuta
                    </Button>

                    <Button onClick={handleCloseAddLoanDialog} variant="contained" color="error" sx={{ mr: 1 }}>
                        Anuleaza
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    );
};

export default Books;