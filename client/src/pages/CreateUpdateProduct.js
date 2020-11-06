import React, { Component } from 'react';

const categorias = ['ropa','juguete', 'experiencia']
class CreateUpdateProduct extends Component {
    constructor(props) {
        super(props);
        // si usamos un estado vacio, estamos simulando que es un create, si le ponemos valores inciales, es un update.
        this.state = {titulo: '', descripcion: '', stock: 0, imagen: '', precio: ''};
        /* this.state= {
            id: 'adasd',
            titulo: 'Zapatilla',
            descripcion: 'Esta compra será para ayudar a la ONG Fundación Potrero. El Potrero se funda a partir de la motivación de un grupo de amigos con el fin de fomentar la igualdad de oportunidades de niños y jóvenes alrededor del país.',
            precio: '$1.400',
            cantidad: 'Cantidad: 1',
            stock: 'Hasta agotar stock de 100 pares de zapatillas.',
            stars: 3,
            link: 'https://www.elpotrero.org',
            imagen: 'https://topperarg.vteximg.com.br/arquivos/ids/211016-1200-1200/025433.jpg?v=636979578311500000'
          } */
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this)
    }

    handleOnClick = () => {
        const {titulo, descripcion, precio} = this.state
        if(titulo && descripcion && precio){
            alert(JSON.stringify(this.state))
            // ACA IRIA EL POST/PUT A LA API
        } else {
            alert('FALTAN CAMPOS POR COMPLETAR')
        }
    };
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
    
        if (target.type === 'checkbox') {
            this.setState({
                categorias: {...this.state.categorias, [name]: value}
              });
        } else {
            this.setState({
                [name]: value
              });
        }
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            img = URL.createObjectURL(img)
            this.setState({
              imagen: img
            });
        }
    }

    render() {
        console.log('state: ', this.state)
        return (
            <div>
            <h1>{this.state.id ? 'Update' : 'Create'} Product</h1>
            <form>
            <input onChange={this.handleInputChange} value={this.state.titulo} name="titulo" required type="text" placeholder="Enter Product Title" /><br /><br />
            <input onChange={this.handleInputChange} value={this.state.descripcion} name="descripcion" required type="text" placeholder="Enter Product Price" /><br /><br />
            <input onChange={this.handleInputChange} value={this.state.precio} name="precio" required type="text" placeholder="Enter Product Description" /><br /><br />
            <input onChange={this.handleInputChange} value={this.state.stock} name="stock" required type="text" placeholder="Enter Product Stock" /><br /><br />
            {categorias.map(cat => 
            <div>
                <label for={cat}> {cat}</label>
                <input onChange={this.handleInputChange}  type="checkbox" id={cat} name={cat} value={cat}/>
            </div>
            )}
            <img src={this.state.imagen} />
           {!this.state.imagen ?<div> <input onChange={this.onImageChange} value={this.state.image} name="imagen" required type="file" placeholder="Upload Product Image" /><br /><br /> </div>: null} 
            <button onClick={this.handleOnClick}>{this.state.id ? 'UPDATE' : 'CREATE'}</button>
            </form>
            </div>
        );
    }
}
export default CreateUpdateProduct;
