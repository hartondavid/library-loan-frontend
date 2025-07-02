import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    IconButton,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Pagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiDeleteBook } from '../api/books';
import { showErrorToast, showSuccessToast } from '../utils/utilFunctions';
import { apiGetUserRights } from '../api/rights';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const ProductCards = ({ products, setProducts, editButton = false, deleteButton = false, reserveButton = false,
    reserveButtonAction, addButton = false, title = false }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (productId) => {
        setProductToDelete(productId);
        setOpenDialog(true);
        console.log('rightCode', rightCode);

    };

    const handleDeleteProduct = () => {
        apiDeleteBook(
            (response) => {
                showSuccessToast(response.message);
                setProducts(products => products.filter(product => product.id !== productToDelete));
                setOpenDialog(false);
            },
            showErrorToast,
            productToDelete,
        );
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const [rightCode, setRightCode] = useState('');
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        apiGetUserRights(
            (response) => {

                setRightCode(response[0]?.right_code);
                setUserId(response[0]?.user_id);

            },
        )
    }, [userId])


    console.log('rightCode', rightCode);


    // Calculate pagination
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    function getCardOnClick(product) {

        return () => handleOpenProductDetailsDialog(product);

    }


    const [product, setProduct] = useState(null);
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);

    const handleOpenProductDetailsDialog = (product) => {
        setProduct(product);
        setOpenProductDetailsDialog(true);
    };

    const handleCloseProductDetailsDialog = () => {
        setOpenProductDetailsDialog(false);
    };



    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>

                {title && (
                    <Typography variant="h4">{title}</Typography>
                )}
                {addButton && (
                    <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/addEditBook/0')}
                        sx={{ backgroundColor: '#7B3F00', color: 'white' }}
                    >
                        Adauga carte
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {currentItems.map((product) => (
                    <Grid item xs={12} sm={3} md={3} lg={3} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',

                                position: 'relative',
                                '&:hover': {
                                    boxShadow: 6,
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={getCardOnClick(product, editButton, navigate, reserveButton)}>
                            <CardMedia
                                component="img"
                                height="400px"
                                image={`${process.env.REACT_APP_API_URL}/${product.photo}`}
                                alt={product.name}

                            />


                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="black" sx={{ mb: 1, fontSize: '15px' }}>
                                    {product.author}
                                </Typography>

                                <Typography variant="h6" component="div" sx={{ fontSize: '15px', mb: 1 }}>
                                    {product.description && product.description.length > 30
                                        ? <>
                                            {product.description.slice(0, 30)}<MoreHorizIcon fontSize="small" sx={{ ml: 0.5 }} />
                                        </>
                                        : product.description}
                                </Typography>

                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
                                    {'Limba: ' + product.language}
                                </Typography>

                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
                                    {'Editura: ' + product.publisher}
                                </Typography>

                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
                                    {'Numar de pagini: ' + product.number_of_pages}
                                </Typography>

                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '15px' }}>
                                    {'Cantitate: ' + product.quantity + ' buc'}
                                </Typography>

                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                {editButton &&
                                    (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/dashboard/addEditBook/${product.id}`);
                                            }}
                                            sx={{ color: 'black' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                {deleteButton && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDialog(product.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                {reserveButton && reserveButtonAction && (

                                    <Button
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reserveButtonAction(product.id);
                                        }}
                                        sx={{ fontSize: '15px', fontWeight: 'bold', backgroundColor: ' #7B3F00', color: 'white' }}
                                        variant='contained'

                                    >
                                        {'Imprumuta'}
                                    </Button>

                                )}

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Stergere carte</DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa stergi aceasta carte?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: ' #7B3F00', color: 'white' }} variant="contained">
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" variant="contained">
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openProductDetailsDialog} onClose={handleCloseProductDetailsDialog}>
                <DialogTitle>Detalii produs</DialogTitle>
                <DialogContent sx={{ width: '100%', height: '50%' }}>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        {product?.name}
                    </Typography>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px' }}>
                        {product?.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductDetailsDialog} sx={{ backgroundColor: '#7B3F00', color: 'white' }}>
                        Inchide
                    </Button>
                </DialogActions>

            </Dialog>

        </Box>
    );
};

export default ProductCards; 