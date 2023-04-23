import React, { Component } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';


class EliminarSucursalFormulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      canton: "",
      distrito: "",
      provincia: "",
      fecha_apertura: "",
      horario_atencion: "",
      administrador: "",
      capacidad_maxima: "",
      telefono: "",
      activacion_spa: "",
      activacion_tienda: "",
      showModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOuterClick = this.handleOuterClick.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos al backend para crear una nueva sucursal
    axios
      .delete("http://localhost:5236/api/sucursal/"+this.state.nombre, {
        nombre: this.state.nombre,
        canton: this.state.canton,
        distrito: this.state.distrito,
        provincia: this.state.provincia,
        fecha_apertura: this.state.fecha_apertura,
        horario_atencion: this.state.horario_atencion,
        administrador: this.state.administrador,
        capacidad_maxima: this.state.capacidad_maxima,
        activacion_spa: this.state.activacion_spa,
        activacion_tienda: this.state.activacion_tienda,
      })

    console.log("Sucursal eliminada");
    this.props.onClose();
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOuterClick(event) {
    const container = document.querySelector('.container1');
    if (container && !container.contains(event.target)) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOuterClick);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOuterClick);
  };

  render() {    
    return (
      <div
        className="container1"
        style={{
          maxWidth: '300px',
          margin: '0 auto',
          marginTop: '20px',
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: '1',
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <h2>Eliminar sucursal</h2>
          <div className="form-input">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleChange}
              required
            />
          </div>
          
            <div style={{marginTop: "20px"}}>
            <button type="submit" style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #000",
              border: "1px solid #00008B",
              color: "#00008B",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
              padding: "10px 20px"
            }}>Eliminar sucursal</button>
            </div>

      </Form>
    </div>
            );
    }
}
export default EliminarSucursalFormulario;