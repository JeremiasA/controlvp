const Venta = require("../models/model");
const Pedido = require("../models/pedidos");
const mongoose = require("mongoose");
const moment = require("moment");
const { collection } = require("../models/model");
const controller = {};

// -------------------------- FUNCIONES GLOBALES -------------------------------------------
const formatFechas = (venta) => {
  const fechas_formateadas = [];
  for (const vent of venta) {
    if (vent.fecha != null) {
      vent.fecha.setMinutes(
        vent.fecha.getMinutes() + vent.fecha.getTimezoneOffset()
        );
        fechas_formateadas.push(moment(vent.fecha).format("YYYY-MM-DD"));
      }
    }
    return fechas_formateadas;
  };
  const totales = (venta) =>{
    let total = 0;
    venta.forEach(v => {
      total += v.total;
    });
  return total;
}


//ARRAYS
const values = ["00","01","02","03","04","05","06","07","08","09","10","11","12"];
const meses = ["Todos", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
 "Octubre", "Noviembre", "Diciembre"];
 const aniosvalues = ["2021", "2020", "2019", "2018", "2017", "2016", "0000"];
 const anios = ["2021", "2020", "2019", "2018", "2017", "2016", "Todos"];


// -------------------------- CONTROLLERS -------------------------------------------
controller.filter = async (req, res) => {
  // FUNCIONES
  const filtrado_ventas = async () => {
    
    if (req.query.ventas_anioselect != "0000") { // si se envia un año de filtrado distinto a 0000 (todos)
      if (req.query.ventas_messelect != "00") {// si ademas se envia un mes de filtrado distinto a 00 (todos)
        return await Venta.find({mes: req.query.ventas_messelect,anio: req.query.ventas_anioselect,}); // filtra por mes y año
      } else {
        return await Venta.find({ anio: req.query.ventas_anioselect }); // si mes = todos, filtra solo por año
      }
    } else {
      if (req.query.ventas_messelect != "00"){
        return await Venta.find({mes: req.query.ventas_messelect});
            }
      else{
        return await Venta.find(); // pide todos los documentos de la base de datos
      }
    }
  };
  const filtrado_pedidos = async () => {
    
    if (req.query.pedidos_anioselect != "0000") { // si se envia un año de filtrado distinto a 0000 (todos)
      if (req.query.pedidos_messelect != "00") {// si ademas se envia un mes de filtrado distinto a 00 (todos)
        return await Pedido.find({mes: req.query.pedidos_messelect,anio: req.query.pedidos_anioselect,}); // filtra por mes y año
      } else {
        return await Pedido.find({ anio: req.query.pedidos_anioselect }); // si mes = todos, filtra solo por año
      }
    } else {
      if (req.query.pedidos_messelect != "00"){
        return await Pedido.find({mes: req.query.pedidos_messelect});
            }
      else{
        return await Pedido.find(); // pide todos los documentos de la base de datos
      }
    }
  };
  const datos = {
       values: values,
       meses: meses,
       aniosvalues: aniosvalues,
       anios:anios,
       
      }
      
  
  if(req.query.ventas_messelect){
  datos.mes_selected = req.query.ventas_messelect,
  datos.anio_selected = req.query.ventas_anioselect
  datos.venta = await filtrado_ventas();
  datos.fechas_formateadas = formatFechas(await filtrado_ventas());
  datos.total = totales(await filtrado_ventas())  
  res.render("index", { datos });
}
else if (!req.query.ventas_messelect){
  datos.mes_selected = req.query.pedidos_messelect,
  datos.anio_selected = req.query.pedidos_anioselect
  datos.pedido = await filtrado_pedidos();
  datos.fechas_formateadas_pedidos = formatFechas(await filtrado_pedidos());
  res.render("pedidos", { datos });
      }
    
  };


controller.index = async (req, res) => {
    
    //FUNCIONES
    const consultaVentas = async () =>{
      return await Venta.find();
    }
    

    // DATOS PARA ENVIAR AL VIEW ENGINE
    const datos = {
      venta:await consultaVentas(),
      fechas_formateadas : formatFechas(await consultaVentas()),
      values: values,
      meses: meses,
      aniosvalues: aniosvalues,
      anios:anios,
      anio_selected: req.query.ventas_anioselect,
      total: totales(await consultaVentas())
    }
   // RESPUESTA
  res.render("index", {datos});
};
controller.pedidos = async (req, res) => {
 
  //FUNCIONES
   const consultaPedidos = async () =>{
    return await Pedido.find();
  }
  // DATOS PARA ENVIAR AL VIEW ENGINE
  const datos = {
     pedido: await consultaPedidos(),
     fechas_formateadas_pedidos : formatFechas(await consultaPedidos()),
     values: values,
     meses: meses,
     aniosvalues: aniosvalues,
      anios:anios,
      anio_selected: req.query.ventas_anioselect
   }
   // RESPUESTA
  res.render("pedidos", {datos});
};

controller.delete = async (req, res) => {
  const id = req.params.id;

  if(req.query.collection == "venta"){
     await Venta.deleteOne({ _id: id })
     res.redirect("/");
    }
    else if (req.query.collection == "pedido"){
      await Pedido.deleteOne({ _id: id }); 
      res.redirect("/pedidos");
  } 
  
};

controller.edit = async (req, res) => {
  const id = req.params.id;
 
  if(req.query.collection=="venta"){
    await Venta.updateOne({ _id: id }, req.body);
    res.redirect("/");
  } 
  else if(req.query.collection=="pedido"){
    await Pedido.updateOne({ _id: id }, req.body);
    res.redirect("/pedidos");
  } 
};

controller.nueva = async (req, res) => {
// FUNCIONES
const instanciarNueva = () =>{
    if(req.query.collection == "venta"){
      return new Venta(req.body);
    } 
    else if(req.query.collection == "pedido"){
      return new Pedido(req.body);
    }
}
const corregirUsoHorario = (nueva) =>{
   nueva.fecha.setMinutes(nueva.fecha.getMinutes() + nueva.fecha.getTimezoneOffset());
   return nueva; 
}
const asignarMesyAnio = (nueva) =>{
   nueva.mes = moment(nueva.fecha).format("MM");
   nueva.anio = moment(nueva.fecha).format("YYYY");
   return nueva;
}
const guardarNueva = async (nueva) =>{
  await nueva.save();
}

// EJECUCION
guardarNueva(asignarMesyAnio(corregirUsoHorario(instanciarNueva())))
// RESPUESTA
res.redirect("back");
};


controller.entregada = async (req, res) => {
// FUNCIONES
const buscarPedido = async ()=>{
  const {id} = req.body;
  return await Pedido.findById({_id:req.body.id});
}
const nuevaVenta = (ped) =>{
  const fecha_formateada = ped.fecha.setMinutes(ped.fecha.getMinutes() + ped.fecha.getTimezoneOffset());
  ped.mes = moment(fecha_formateada).format("MM");
  ped.anio = moment(fecha_formateada).format("YYYY");
  return new Venta({
        producto:ped.producto,
        fecha:fecha_formateada,
        mes:ped.mes,
        anio: ped.anio,
        total:ped.total,
        descripcion:"Entregado"
      });
}
const guardarNueva = async (nueva) =>{
  await nueva.save();
}

// EJECUCION
await guardarNueva(nuevaVenta(await buscarPedido()))
// RESPUESTA
res.redirect('/pedidos');
// res.redirect(`/delete/${req.body.id}?collection=pedido`);
};

module.exports = controller;
