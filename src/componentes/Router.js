import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Productos from './Productos';
import Nosotros from './Nosotros';
import Navegacion from './Navegacion';
import Contacto from './Contacto';
import Error from './Error';
import infoProductos from '../datos/datos.json';
import Header from './Header';
import SingleProducto from './SingleProducto';

class Router extends Component {
    state = {
        productos: [],
        terminoBusqueda: ''
    }

    componentWillMount() {
        this.setState({ productos: infoProductos });
    }

    busquedaProductos = (busqueda) => {
        if (busqueda.length > 3) {
            this.setState({ terminoBusqueda: busqueda });
        }
        else {
            this.setState({ terminoBusqueda: '' });
        }
    }

    render() {
        let productos = [...this.state.productos];
        let busqueda = this.state.terminoBusqueda;
        let resultado;

        if (busqueda !== '') {
            resultado = productos.filter(producto => (
                producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
            ))
        }
        else {
            resultado = productos;
        }

        return (
            <BrowserRouter>
                <Header />
                <Navegacion />

                <Switch>
                    <Route exact path="/" render={() => (
                        <Productos
                            productos={resultado}
                            busquedaProductos={this.busquedaProductos} />
                    )} />
                    <Route exact path="/nosotros" component={Nosotros} />
                    <Route exact path="/productos" render={() => (
                        <Productos
                            productos={resultado} 
                            busquedaProductos={this.busquedaProductos} />
                    )} />
                    <Route exact path="/producto/:productoId" render={(props) => {
                        let idProducto = props.location.pathname.replace('/producto/', '');
                        return (
                            <SingleProducto
                                producto={this.state.productos[idProducto]} />
                        )
                    }} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;