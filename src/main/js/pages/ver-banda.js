const React = require('react');
const client = require('../client');
const { Link, useParams, } = require('react-router-dom');
const {useState, useEffect} = require('react');



const PageVerBanda = () => {

    let { id } = useParams();
    const [banda, setBanda] = useState({});
    const [integrantes, setIntegrantes] = useState([]);


    useEffect(() => {
        url_banda = '/api/bandas/' + id

        client({
            method: 'GET',
            path: url_banda
        }).done(response => setBanda(response.entity));

        client({
            method: 'GET',
            path: url_banda + '/formacion'
        }).done(response => setIntegrantes(response.entity))
        
    }, []);


    return (
        <>
            <h1>Venta</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th>Total</th>
                        <td>{banda.nombre}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <h2>Producto</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>VentaDetalle</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>

                    {integrantes.map(integrante => {

                        return (
                            <tr key={integrante.ID}>
                                <td>{integrante.MUSICO}</td>
                                <td>{integrante.INSTRUMENTO}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </table>
            <hr />
            <Link to={`/ver-banda/${id}/nuevo-integrante`}>Agregar</Link> |  
            <Link to="/">Volver</Link>
        </>
    )
}

module.exports = PageVerBanda;