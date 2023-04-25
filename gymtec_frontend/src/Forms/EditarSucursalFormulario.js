import React, { Component } from "react";
import axios from "axios";
import { Form } from 'react-bootstrap';


class EditarSucursalFormulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: this.props.editName,
      canton: "",
      distrito: "",
      provincia: "",
      fecha_apertura: "",
      horario_atencion: "",
      administrador: "",
      capacidad_maxima: "",
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
      .put("http://localhost:5236/api/sucursal/"+this.state.nombre, {
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
      .then((response) => {
        // Actualizar el estado de los pacientes con los nuevos datos ingresados
        this.props.onEditSucursal();
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

    console.log("Sucursal editada");
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
          <h2>Editar sucursal</h2>
          <div className="form-input">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleChange}
              required
              disabled
            />
          </div>
          <div className="form-input">
            <label htmlFor="canton">Cantón:</label>
            <input
              type="text"
              name="canton"
              value={this.state.canton}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="distrito">Distrito:</label>
            <input
              type="text"
              name="distrito"
              value={this.state.distrito}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="provincia">Provincia:</label>
            <input
              type="text"
              name="provincia"
              value={this.state.provincia}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="fecha_apertura">Fecha de apertura:</label>
            <input
              type="date"
              name="fecha_apertura"
              value={this.state.fecha_apertura}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="horario_atencion">Horario de atención:</label>
            <input
              type="text"
              name="horario_atencion"
              value={this.state.horario_atencion}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="administrador">Administrador:</label>
            <input
              type="text"
              name="administrador"
              value={this.state.administrador}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="capacidad_maxima">Capacidad máxima:</label>
            <input
              type="text"
              name="capacidad_maxima"
              value={this.state.capacidad_maxima}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="activacion_spa">Activación Spa:</label>
            <input
              type="text"
              name="activacion_spa"
              value={this.state.activacion_spa}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="activacion_tienda">Activación Tienda:</label>
            <input
              type="text"
              name="activacion_tienda"
              value={this.state.activacion_tienda}
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
            }}>Editar sucursal</button>
            </div>

      </Form>
    </div>
            );
    }
}
export default EditarSucursalFormulario;