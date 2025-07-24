import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { apiAddBook, apiGetBookById, apiUpdateBook } from "../../api/books";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addStyleToTextField } from "../../utils/utilFunctions";
import { getImageUrl } from "../../utils/imageUtils";

const AddEditBook = ({
}) => {
    const navigate = useNavigate(); // Initialize navigate function
    const { bookId } = useParams();
    //Dialog for image path
    const [dialogContent, setDialogContent] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);  // For the modal
    const [fileForImagePath, setFileForImagePath] = useState(null);

    const [confirm, setConfirm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        photo: null,
        language: '',
        quantity: '',
        publisher: '',
        numberOfPages: '',
    });

    const [completedForm, setCompletedForm] = useState(false);

    useEffect(() => {
        if (bookId && bookId !== "0") {
            apiGetBookById((response) => {
                parseBookResponse(response.data);
                setConfirm(true);
            }, showErrorToast, bookId)

            console.log('parseProductResponse', formData);
        }
    }, [bookId])

    const parseBookResponse = (data) => {
        setFormData({
            title: data.title || '',
            author: data.author || '',
            description: data.description || '',
            photo: data.photo ? getImageUrl(data.photo) : null,
            language: data.language || '',
            quantity: data.quantity || 0,
            publisher: data.publisher || '',
            numberOfPages: data.number_of_pages || 0,
        });
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Open the dialog
    const handleOpenDialog = (dialogTitle, dialogContent) => {
        setDialogContent(dialogContent)
        setDialogTitle(dialogTitle)
        setDialogOpen(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setDialogContent('')
        setDialogTitle('')
        setDialogOpen(false);
        //setFile(null);
    };



    // Handle file change
    const handleFileForImagePathChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileForImagePath(selectedFile);
        setFormData({ ...formData, photo: URL.createObjectURL(selectedFile) }); // Update the state to show the preview

    };

    // Handle confirmation for photo upload
    const handleConfirmForImagePath = () => {
        if (fileForImagePath) {
            setFormData({ ...formData, photo: URL.createObjectURL(fileForImagePath) });
            handleCloseDialog();
            setConfirm(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            language: formData.language,
            quantity: formData.quantity,
            publisher: formData.publisher,
            numberOfPages: formData.numberOfPages,
        }

        if (fileForImagePath) {
            payload.photo = fileForImagePath;
        }

        if (bookId === '0') {
            apiAddBook((response) => { navigate(-1); showSuccessToast(response.message) }, showErrorToast, payload)
        } else {
            apiUpdateBook((response) => { navigate(-1) }, showErrorToast, bookId, payload)
        }
    };

    useEffect(() => {
        const isFormCompleted =
            formData.title &&
            formData.author &&
            formData.description &&
            formData.language &&
            formData.quantity &&
            formData.photo &&
            formData.publisher &&
            formData.numberOfPages;

        setCompletedForm(isFormCompleted);
    }, [formData]);
    return (
        <>
            <Box sx={{ marginLeft: '20px', marginRight: '10px', mt: '20px', mb: '20px' }}  >
                <Typography variant="h4">
                    <span className="font-bold text-black">{bookId === "0" ? "Adauga carte" : "Editeaza carte"}</span>
                </Typography>

                <form onSubmit={handleSubmit} >

                    {/* Display photo or add photo button */}
                    <Box sx={{
                        position: 'relative',
                        display: 'inline-block',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}>

                        {formData.photo && confirm ? (
                            <>
                                <img
                                    src={formData.photo}
                                    alt=""
                                    style={{
                                        maxHeight: '300px',
                                        maxWidth: '300px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                {(
                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenDialog("Schimba poza", "Va rugam selectati o noua poza pentru carte", "photo")}
                                        sx={{
                                            position: 'absolute',
                                            bottom: '30px',
                                            right: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            },
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                        startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                                    >
                                        Schimba poza
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => handleOpenDialog("Adauga poza", "Va rugam adaugati o poza pentru carte", "photo")}
                                sx={{
                                    width: '300px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        border: '2px dashed #666',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                <AddPhotoAlternateIcon sx={{ fontSize: '2.5rem', color: '#666' }} />
                                <Typography variant="body1" sx={{ color: '#666' }}>
                                    Adauga poza
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#999' }}>
                                    Click pentru a selecta o imagine
                                </Typography>
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}  >
                        <TextField
                            label="Titlu"
                            name="title"
                            type='string'
                            value={formData.title || ''}
                            fullWidth
                            onChange={handleChange}
                            sx={addStyleToTextField(formData.title)}
                        >
                        </TextField>
                        <TextField
                            label='Autor'
                            name="author"
                            type="string"
                            value={formData.author || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.author)}
                        />
                        <TextField
                            label='Descriere'
                            name="description"
                            type="string"
                            value={formData.description || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.description)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="language-label" >Limba</InputLabel>
                            <Select
                                label={'Limba'}
                                labelId="language-label"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                sx={addStyleToTextField(formData.language)}

                            >

                                <MenuItem value={'Romana'}>Romana</MenuItem>
                                <MenuItem value={'Engleza'}>Engleza</MenuItem>
                                <MenuItem value={'Franceza'}>Franceza</MenuItem>
                                <MenuItem value={'Germana'}>Germana</MenuItem>
                                <MenuItem value={'Italiana'}>Italiana</MenuItem>
                                <MenuItem value={'Spaniola'}>Spaniola</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label='Editura'
                            name="publisher"
                            type="string"
                            value={formData.publisher || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.publisher)}
                        />


                        <TextField
                            label='Numar de pagini'
                            name="numberOfPages"
                            type="number"
                            value={formData.numberOfPages || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.numberOfPages)}
                        />


                        <TextField
                            label='Cantitate'
                            name="quantity"
                            type="number"
                            value={formData.quantity || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.quantity)}
                        />

                        {/* Dialog for confirmation and file upload */}
                        {dialogOpen && (
                            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                                <DialogTitle>{dialogTitle}</DialogTitle>
                                <DialogContent>
                                    <Box>
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*,.pdf"
                                            onChange={handleFileForImagePathChange}
                                        />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="error" variant="contained" >Anuleaza</Button>
                                    <Button onClick={handleConfirmForImagePath} sx={{ backgroundColor: '#7B3F00', color: 'white' }} variant="contained" >Confirma</Button>

                                </DialogActions>
                            </Dialog>
                        )}


                        <Box sx={{ mt: 1 }}>
                            <Button type="submit" variant="contained" style={{
                                marginRight: 5, backgroundColor: '#7B3F00', color: 'white', ...(!completedForm && {
                                    backgroundColor: ' #7B3F00',
                                    opacity: 0.5,
                                    color: 'white'
                                })
                            }}
                                disabled={!completedForm}>
                                {bookId === "0" ? 'Adauga carte' : 'Editeaza carte'}
                            </Button>
                            <Button variant="contained" color="error" onClick={() => navigate(-1)}>
                                Renunta
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default AddEditBook;