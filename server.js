const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //use for convert json format to javaScript
const cors = require('cors');

const app = express();


const { Router } = require('express');

//import routes
const employeeRoutes = require('./routes/employees');

//Supplier details
const supplierRoutes = require('./routes/Supplier-routes');
//supplier orders route
const SupplierOrderRoutes = require('./routes/Supplier-order-routes');
//attends route
const attendRoutes = require('./routes/attends');
//Stock-routes 
const StockRoutes = require('./routes/Stock-routes');
//Events  routes
const eventRoutes = require('./routes/Events');
//Customer routes
const customerRoutes = require('./routes/Customer');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//roote middleware
app.use(employeeRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/supplierorder', SupplierOrderRoutes);
app.use(attendRoutes);
app.use('/api/stock', StockRoutes);
app.use(eventRoutes);
app.use(customerRoutes);

const PORT = 8000;// sever port
const DB_URL = `mongodb+srv://Admin:admin321@project.0tb9c.mongodb.net/HTM_Db?retryWrites=true&w=majority`;

//crate options
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
    
})


//db Connection
mongoose.connect(DB_URL)
.then(()=>{
    console.log('MongoDB Connected!');
})
.catch((err)=> console.log('DB Connection Error!',err));                 

app.listen(PORT, ()=>{
         console.log(`App is running on ${PORT}`);
});